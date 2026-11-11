// Adapted from the verified PORTAL-3299 driver; provenance in ../sources.json.
// JSON-lines RPC. Requests originate only from the served Swagger UI Execute button.
// Tokens exist only in this process/browser memory; screenshots mask curl/auth UI.
const { createRequire } = require('node:module');
const fs = require('node:fs/promises');
const path = require('node:path');
const readline = require('node:readline');
if (process.argv.includes('--help')) {
  process.stdout.write('Swagger JSON-lines driver. Configure PORTAL_SWAGGER_DOCS_URL and PORTAL_PLAYWRIGHT_PACKAGE_JSON. See ../README.md.\n');
  process.exit(0);
}
const packageJson = path.resolve(process.env.PORTAL_PLAYWRIGHT_PACKAGE_JSON || path.join(process.cwd(), 'frontend/package.json'));
const { chromium } = createRequire(packageJson)('playwright');
const docsUrl = process.env.PORTAL_SWAGGER_DOCS_URL || 'http://localhost:8000/docs';
let browser, page, servedSpec, currentToken = null;
let activeStage = 'startup', activeScreenshots = [], redactBody = false;

function redact(value, token = currentToken) {
  let text = String(value);
  if (token) text = text.split(token).join('[REDACTED]');
  if (currentToken && token !== currentToken) text = text.split(currentToken).join('[REDACTED]');
  return text;
}
function reply(data) { process.stdout.write(redact(JSON.stringify(data)) + '\n'); }
function safeError(error, token) {
  return redact(String(error && error.message || error), token).split('Call log:')[0].trim().slice(0, 1200);
}
function parameters(input) {
  const pairs = Array.isArray(input) ? input : Object.entries(input || {}).flatMap(([key, value]) =>
    Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
  const groups = new Map();
  for (const [key, value] of pairs) {
    if (value === null || value === undefined) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(String(value));
  }
  return groups;
}
async function resetPage(method, template) {
  if (page) await page.close();
  currentToken = null;
  page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  page.setDefaultTimeout(30000);
  const specResponse = page.waitForResponse(response => new URL(response.url()).pathname.endsWith('/openapi.json'));
  specResponse.catch(() => {});
  const schema = servedSpec?.paths?.[template]?.[String(method).toLowerCase()];
  const target = schema ? docsUrl.split('#')[0] + `#/${encodeURIComponent(schema.tags?.[0] || 'default')}/${encodeURIComponent(schema.operationId)}` : docsUrl;
  await page.goto(target, { waitUntil: 'networkidle', timeout: 45000 });
  servedSpec = await (await specResponse).json();
  await page.locator('.opblock').first().waitFor({ state: 'attached' });
}
async function operation(method, template) {
  // Served Swagger progressively renders operations. Its native deep link opens
  // the requested tag; metadata is from the UI's own OpenAPI network response.
  const schema = servedSpec.paths?.[template]?.[method.toLowerCase()];
  if (!schema) throw new Error(`No served OpenAPI operation for ${method} ${template}`);
  const tag = schema.tags?.[0] || 'default';
  const hash = `#/${encodeURIComponent(tag)}/${encodeURIComponent(schema.operationId)}`;
  await page.goto(docsUrl.split('#')[0] + hash, { waitUntil: 'networkidle' });
  await page.waitForFunction(({ method, template }) => [...document.querySelectorAll('.opblock')].some(node =>
    node.querySelector('.opblock-summary-method')?.textContent.trim().toUpperCase() === method &&
    node.querySelector('.opblock-summary-path')?.getAttribute('data-path') === template), { method, template });
  const id = await page.locator('.opblock').evaluateAll((blocks, desired) => {
    const block = blocks.find(node => {
      const method = node.querySelector('.opblock-summary-method')?.textContent.trim().toUpperCase();
      const label = node.querySelector('.opblock-summary-path');
      const route = label?.getAttribute('data-path') || label?.textContent.trim();
      return method === desired.method && route === desired.template;
    });
    return block?.id || null;
  }, { method, template });
  if (!id) throw new Error(`No served Swagger operation for ${method} ${template}`);
  const op = page.locator(`[id=${JSON.stringify(id)}]`);
  await op.scrollIntoViewIfNeeded();
  if (await op.locator('.opblock-body').count() === 0) await op.locator('.opblock-summary-control').click();
  return { op, id };
}
async function authorize(op, token) {
  if (!token) return;
  await op.locator('.opblock-summary .authorization__btn').click();
  const auth = page.locator('.dialog-ux .auth-container').filter({ hasText: 'HTTPBearer' });
  await auth.waitFor({ state: 'visible' });
  await auth.locator('input[type="text"]').fill(token);
  await auth.locator('button.authorize').click();
  await auth.getByRole('button', { name: 'Close', exact: true }).click();
  await page.locator('.dialog-ux').waitFor({ state: 'hidden' });
  currentToken = token;
}
async function fillParameters(op, command) {
  activeStage = 'Try it out';
  await op.getByRole('button', { name: 'Try it out', exact: true }).click();
  const query = parameters(command.params);
  const paths = parameters(command.path_params);
  const rows = op.locator('tr[data-param-name]');
  const seen = new Set();
  for (let index = 0; index < await rows.count(); index++) {
    const row = rows.nth(index);
    const name = await row.getAttribute('data-param-name');
    const location = await row.getAttribute('data-param-in');
    const source = location === 'path' ? paths : query;
    seen.add(`${location}:${name}`);
    if (!source.has(name)) continue; // Preserve native Swagger defaults.
    const values = source.get(name);
    const add = row.getByRole('button', { name: /^Add / });
    if (await add.count()) {
      const remove = row.locator('.json-schema-form-item-remove');
      while (await remove.count()) await remove.first().click();
      for (const value of values) {
        activeStage = `Add ${location} ${name} array item`;
        await add.first().click();
        activeStage = `Fill ${location} ${name} array item`;
        await row.locator('input,textarea').last().fill(value);
      }
    } else if (await row.locator('select').count()) {
      if (values.length !== 1) return `Swagger has one dropdown for ${name}`;
      const options = await row.locator('select option').evaluateAll(nodes => nodes.map(node => node.value));
      if (!options.includes(values[0])) return `Swagger dropdown cannot submit ${name}=${JSON.stringify(values[0])}; use a valid UI value and raw_query_params for malformed input`;
      await row.locator('select').selectOption(values[0]);
    } else {
      if (values.length !== 1) return `Swagger has one input for ${name}`;
      const input = row.locator('input,textarea').first();
      if (!await input.count()) return `Swagger has no editable input for ${name}`;
      activeStage = `Fill ${location} ${name}`;
      await input.fill(values[0]);
      if (location === 'query' && /[\r\n]/.test(values[0]) && await input.inputValue() !== values[0]) {
        // Native single-line HTML inputs remove line breaks from armored keys.
        // Preserve the supplied query through Swagger's normal interceptor only.
        command.__multiline_query ||= {};
        command.__multiline_query[name] = values;
      }
    }
  }
  for (const [location, groups] of [['path', paths], ['query', query]]) {
    for (const name of groups.keys()) if (!seen.has(`${location}:${name}`)) return `Swagger has no ${location} input for ${name}; use raw_query_params for unknown query input`;
  }
  const body = op.locator('textarea.body-param__text');
  if (command.body !== undefined) {
    if (!await body.count()) return 'Swagger has no request-body editor for this operation';
    await body.fill(typeof command.body === 'string' ? command.body : JSON.stringify(command.body, null, 2));
  }
  return null;
}
async function configureMalformedInput(command, nativePath, expectedPath, method) {
  const queryGroups = parameters(command.__multiline_query);
  for (const [name, values] of parameters(command.raw_query_params)) queryGroups.set(name, values);
  const hasQuery = queryGroups.size > 0;
  const hasBody = command.raw_body !== undefined;
  const hasPath = command.raw_path_params !== undefined && Object.keys(command.raw_path_params).length > 0;
  if (!hasQuery && !hasBody && !hasPath) return;
  await page.evaluate(({ groups, hasQuery, rawBody, hasBody, hasPath, nativePath, expectedPath, method }) => {
    // Documented Swagger interceptor modifies only explicitly requested malformed inputs.
    // No response interception, APIRequestContext, direct fetch, or DOM response replacement.
    const config = ui.getConfigs();
    const original = config.requestInterceptor;
    config.showMutatedRequest = true;
    config.requestInterceptor = async request => {
      const result = original ? await original(request) : request;
      const url = new URL(result.url, window.location.href);
      if (url.pathname === nativePath && result.method.toUpperCase() === method) {
        if (hasPath) url.pathname = expectedPath;
        if (hasQuery) for (const [key, values] of groups) {
          url.searchParams.delete(key);
          for (const value of values) url.searchParams.append(key, value);
        }
        result.url = url.toString();
        if (hasBody) result.body = rawBody;
      }
      return result;
    };
  }, { groups: [...queryGroups], hasQuery,
    rawBody: typeof command.raw_body === 'string' ? command.raw_body : JSON.stringify(command.raw_body),
    hasBody, hasPath, nativePath, expectedPath, method });
}
function masks(op) {
  return [op.locator('.curl-command'), op.locator('input'), op.locator('.request-url pre'), op.locator('.highlight-code span').filter({hasText: /^\"?(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?:_0)?|[0-9A-F]{40})\"?$/i}), page.locator('.dialog-ux'), page.locator('.scheme-container .authorize'), ...(redactBody ? [op.locator('textarea.body-param__text')] : [])];
}
async function captureControls(op, directory, name, suffix = 'parameters') {
  // Even a tall element screenshot temporarily expands Chromium's viewport and
  // unmounts virtualized Swagger content. Keep the real viewport fixed and
  // capture overlapping visible sections from the native heading to Execute.
  const screenshots = [];
  await op.locator('.opblock-summary').evaluate(node => node.scrollIntoView({ block: 'start' }));
  const height = await page.evaluate(() => window.innerHeight);
  for (let index = 0; index < 12; index++) {
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const target = path.join(directory, `${name}_${suffix}_${String(index + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: target, fullPage: false, mask: masks(op), maskColor: '#444444' });
    screenshots.push(target);
    const execute = await op.getByRole('button', { name: 'Execute', exact: true }).boundingBox();
    if (!execute) throw new Error('Native Execute unmounted during bounded controls capture');
    if (execute.y >= 0 && execute.y + execute.height <= height) return screenshots;
    if (execute.y < 0) await op.getByRole('button', { name: 'Execute', exact: true }).scrollIntoViewIfNeeded();
    else await page.evaluate(amount => window.scrollBy(0, amount), height - 120);
  }
  throw new Error('Native controls exceed twelve bounded viewport sections');
}
async function captureResponse(op, directory, name) {
  const live = op.locator('.responses-inner > div').filter({ has: page.locator('.live-responses-table') }).first();
  const body = live.locator('.live-responses-table .highlight-code pre').first();
  const screenshots = [];
  const scroll = await body.count() ? await body.evaluate(el => ({ height: el.scrollHeight, client: el.clientHeight })) : { height: 0, client: 0 };
  const pages = scroll.client > 0 ? Math.max(1, Math.ceil(scroll.height / scroll.client)) : 1;
  for (let index = 0; index < pages; index++) {
    if (await body.count()) await body.evaluate((el, top) => { el.scrollTop = top; }, index * scroll.client);
    const target = path.join(directory, `${name}_response${pages > 1 ? '_' + String(index + 1).padStart(2, '0') : ''}.png`);
    await live.screenshot({ path: target, mask: masks(op), maskColor: '#444444' });
    screenshots.push(target);
  }
  if (await body.count()) await body.evaluate(el => { el.scrollTop = 0; });
  return screenshots;
}
async function verifyResponse(op, id, response, body, text) {
  await op.locator('.live-responses-table').waitFor({ state: 'visible' });
  try { await page.waitForFunction(({ id, body, text, status, url }) => {
    const op = document.getElementById(id);
    const table = op?.querySelector('.live-responses-table');
    const shownStatus = table?.querySelector('tbody .response-col_status')?.textContent.trim();
    const shownUrl = op?.querySelector('.request-url pre')?.textContent.trim();
    const shownBody = table?.querySelector('.highlight-code pre')?.innerText;
    if (!shownStatus || parseInt(shownStatus, 10) !== status || shownUrl !== url) return false;
    if (!text) return !shownBody || !shownBody.trim();
    if (shownBody === undefined) return false;
    try { return JSON.stringify(JSON.parse(shownBody)) === JSON.stringify(body); }
    catch { return shownBody.trim() === text.trim(); }
  }, { id, body, text, status: response.status(), url: response.url() }, { timeout: 15000 });
  } catch {
    const observed = await op.evaluate(node => ({
      status: node.querySelector('.live-responses-table tbody .response-col_status')?.textContent.trim(),
      url: node.querySelector('.request-url pre')?.textContent.trim(),
      body: node.querySelector('.live-responses-table .highlight-code pre')?.innerText,
    }));
    throw new Error(`Swagger response verification mismatch: ${JSON.stringify({ expected_status: response.status(), expected_url: response.url(), observed })}`);
  }
}
async function execute(command) {
  redactBody = command.redact_body === true;
  activeStage = 'Initialize scenario';
  activeScreenshots = [];
  const directory = path.resolve(command.screenshot_dir || path.join(__dirname, 'swagger'));
  const name = String(command.name || command.id || 'scenario').replace(/[^a-zA-Z0-9_.-]/g, '_');
  const method = String(command.method || 'GET').toUpperCase();
  const template = command.path_template || '/encryption-keys';
  const pathNames = [...template.matchAll(/\{([^}]+)\}/g)].map(match => match[1]);
  for (const name of Object.keys(command.raw_path_params || {})) {
    if (!pathNames.includes(name)) throw new Error(`No path placeholder named ${name} in requested operation`);
  }
  const renderPath = values => template.replace(/\{([^}]+)\}/g, (_, key) => encodeURIComponent(String(values?.[key] ?? `{${key}}`)));
  const nativePath = renderPath(command.path_params);
  const expectedPath = renderPath({ ...command.path_params, ...command.raw_path_params });
  const inputLimitations = command.raw_path_params ? [
    'Swagger rejects malformed UUID path values before HTTP. Parameter screenshots show valid native placeholders; the documented requestInterceptor substitutes raw_path_params during Execute. The response screenshot Request URL shows the actual malformed path sent to the server.'
  ] : [];
  await fs.mkdir(directory, { recursive: true });
  // Fresh served UI per scenario prevents previous response/default/auth state leaking.
  activeStage = 'Load native Swagger operation';
  await resetPage(method, template);
  const { op, id } = await operation(method, template);
  activeStage = 'Authorize native Swagger';
  await authorize(op, command.token);
  const unsupported = await fillParameters(op, command);
  activeStage = 'Capture native operation controls';
  const controls = await captureControls(op, directory, name);
  activeScreenshots.push(...controls);
  if (unsupported) return { id: command.id, name, unsupported: true, reason: unsupported, screenshots: controls, docs_url: page.url() };
  activeStage = 'Configure native request interceptor';
  await configureMalformedInput(command, nativePath, expectedPath, method);
  if (command.controls_only) {
    activeStage = 'Verify Execute actionability without sending';
    await op.getByRole('button', { name: 'Execute', exact: true }).click({ trial: true });
    return { id: command.id, name, method, path_template: template, controls_only: true,
      native_controls_verified: true, request_sent: false, screenshots: activeScreenshots,
      multiline_query_fields: Object.keys(command.__multiline_query || {}), raw_path_params: command.raw_path_params,
      input_limitations: inputLimitations, intended_request_path: expectedPath, docs_url: page.url() };
  }
  const pending = page.waitForResponse(response => new URL(response.url()).pathname === expectedPath && response.request().method() === method, { timeout: 60000 });
  pending.catch(() => {});
  activeStage = 'Click native Swagger Execute';
  await op.getByRole('button', { name: 'Execute', exact: true }).click();
  const outcome = await Promise.race([
    pending.then(response => ({ response })),
    op.locator('.validation-errors, input.invalid, select.invalid').first().waitFor({ state: 'visible', timeout: 30000 }).then(() => ({ clientValidation: true })).catch(() => new Promise(() => {})),
  ]);
  if (outcome.clientValidation) return {
    id: command.id, name, client_validation: true,
    reason: 'Swagger UI rejected these inputs before issuing an HTTP request',
    screenshots: [...controls, ...await captureControls(op, directory, name, 'validation')], docs_url: page.url(),
  };
  const response = outcome.response;
  const text = await response.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text; }
  activeStage = 'Verify native response against network';
  await verifyResponse(op, id, response, body, text);
  const notes = [];
  if (command.raw_query_params !== undefined || command.raw_body !== undefined) notes.push('explicit malformed input');
  if (command.raw_path_params !== undefined) notes.push('explicit malformed path (valid native UI placeholders; actual malformed URL verified)');
  if (command.__multiline_query) notes.push('multiline query preservation (native single-line input removes line breaks)');
  activeStage = 'Capture native response';
  return {
    id: command.id, name, method, path_template: template,
    ...(notes.length ? { transport_note: 'Swagger requestInterceptor: ' + notes.join('; ') + '; response unmodified' } : {}),
    ...(inputLimitations.length ? { input_limitations: inputLimitations, raw_path_params: command.raw_path_params } : {}),
    status: response.status(), body, request_url: response.url(), docs_url: page.url(),
    source: 'Served Swagger UI Try it out / Execute', network_verified: true,
    verification: { displayed_status_matches: true, displayed_url_matches: true, displayed_body_matches: true },
    screenshots: [...controls, ...await captureResponse(op, directory, name)], captured_at: new Date().toISOString(),
  };
}
async function boundedExecute(command) {
  const budget = Math.min(180000, Math.max(10000, Number(command.timeout_ms) || 90000));
  let timer;
  try {
    return await Promise.race([execute(command), new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error('Swagger scenario exceeded its execution budget')), budget);
    })]);
  } finally { clearTimeout(timer); }
}
async function main() {
  browser = await chromium.launch({ headless: true });
  await resetPage();
  reply({ ready: true, docs_url: docsUrl });
  for await (const line of readline.createInterface({ input: process.stdin, crlfDelay: Infinity })) {
    if (!line.trim()) continue;
    let command;
    try {
      command = JSON.parse(line);
      if (command.command === 'close') { reply({ id: command.id, closed: true }); break; }
      reply(await boundedExecute(command));
    } catch (error) {
      const message = safeError(error, command?.token);
      try { if (page) await page.close(); } catch {}
      page = null;
      currentToken = null;
      reply({ id: command?.id, name: command?.name || String(command?.id || 'scenario'),
        method: String(command?.method || 'GET').toUpperCase(), path_template: command?.path_template,
        error: message, error_stage: activeStage, screenshots: activeScreenshots, browser_recovered: true });
    }
  }
}
main().catch(error => { reply({ fatal: safeError(error, currentToken) }); process.exitCode = 1; })
  .finally(async () => {
    if (browser) await browser.close();
    // RPC close must exit even while the caller retains its pipe handle.
    process.stdin.destroy();
  });
