import baseConfig from '../../vite.config';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const evidenceDir = "/Users/sbhushan/Documents/workspace/ss/PORTAL-3784/20261105-020358";
const root = path.resolve(import.meta.dirname, '../..');
const sources = new Map([
  ['EncryptionKeyEvents.test.tsx', (code) => code
    .replace("      scenario.sendEvent(\n        trigger === 'keyring-change'", "      if (trigger === 'keyring-change') await capture(\`01-\${view.key}-before\`, \`\${view.key}: before simulated keyring change\`);\n      scenario.sendEvent(\n        trigger === 'keyring-change'")
    .replace("      expect(queryClient.getQueryState(unrelatedKey)?.isInvalidated).toBe(false);", "      expect(queryClient.getQueryState(unrelatedKey)?.isInvalidated).toBe(false);\n      if (trigger === 'keyring-change') await capture(\`01-\${view.key}-after\`, \`\${view.key}: keyring event refreshed the view\`, {pickerInvalidated: queryClient.getQueryState(pickerKey)?.isInvalidated, downloadInvalidated: queryClient.getQueryState(downloadKey)?.isInvalidated, publicKeyInvalidated: queryClient.getQueryState(publicKey)?.isInvalidated});")
    .replace("  candidates = [{ ...candidates[0]", "  await capture('02-picker-before', 'Open Select Existing picker before a simulated keyring change', {pickerReads, downloadReads});\n  candidates = [{ ...candidates[0]")
    .replace("  expect(downloadReads).toBe(1);", "  expect(downloadReads).toBe(1);\n  await capture('02-picker-after', 'Open picker refreshed; download status request count stays at one', {pickerReads, downloadReads});")
    .replace("  const fetchSpy = vi.spyOn(window, 'fetch');", "  await browserPage.getByRole('button', {name: 'Expand all', exact: true}).click();\n  await capture('03-task-pending', 'Key data is already saved, but the workflow is still pending', {taskState: query.state.data?.items[0].keys[0].status});\n  const fetchSpy = vi.spyOn(window, 'fetch');")
    .replace("    expect(requests).toBe(3);", "    expect(requests).toBe(3);\n    await capture('03-task-completed', 'task.completed cleared pending state and canceled the older refetch', {olderRequestAborted: signal?.aborted, keyStatus: query.state.data?.items[0].keys[0].status, remainingTasks: query.state.data?.items[0].keys[0].tasks.length});")],
  ['EncryptionKeyMutationEvents.test.tsx', (code) => code
    .replace("    // Bypass mutation hooks", "    await capture(\`04-\${operation.replaceAll(' ', '-')}-before\`, \`DR Readiness before \${operation}\`);\n    // Bypass mutation hooks")
    .replace("    if (escrow) expect(refreshed.keys[0].is_escrowed).toBe(true);", "    if (escrow) expect(refreshed.keys[0].is_escrowed).toBe(true);\n    await capture(\`04-\${operation.replaceAll(' ', '-')}-after\`, \`DR Readiness refreshed after \${operation}\`, {hasPassphrase: refreshed.has_escrow_passphrase, isEscrowed: refreshed.keys[0].is_escrowed, publishedEvents: publish.mock.calls.length});")
    .replace("  const params = { volume_id: volume.volume_id, key_id: key.id };", "  await browserPage.getByRole('button', {name: 'Expand all', exact: true}).click();\n  await capture('05-volume-before', 'Volume Keys before an enable request');\n  const params = { volume_id: volume.volume_id, key_id: key.id };")
    .replace("  await expect.poll(() => cachedKey()?.state).toBe('enabled');", "  await expect.poll(() => cachedKey()?.state).toBe('enabled');\n  await capture('05-volume-enabled', 'Volume key enabled after HTTP request and keyring event', {keyState: cachedKey()?.state, publishedEvents: publish.mock.calls.length});")
    .replace("  await expect.poll(() => cachedKey()?.state).toBe('disabled');", "  await expect.poll(() => cachedKey()?.state).toBe('disabled');\n  await capture('05-volume-disabled', 'Volume key disabled after HTTP request and keyring event', {keyState: cachedKey()?.state, publishedEvents: publish.mock.calls.length});")
    .replace("  const upload = new FormData();", "  await capture('05-volume-added', 'Existing key added to the volume after keyring event', {candidateId: candidate.id, publishedEvents: publish.mock.calls.length});\n  const upload = new FormData();")
    .replace("  expect(publish).toHaveBeenCalledTimes(4);", "  expect(publish).toHaveBeenCalledTimes(4);\n  await capture('05-volume-uploaded', 'Uploaded key appears in the volume after keyring event', {publishedEvents: publish.mock.calls.length});")
    .replace("  const publish = vi.spyOn(scenario, 'sendEvent');\n  const url = BffRoute", "  await capture('06-ack-before', 'Failed volume-key operation before acknowledgement');\n  const publish = vi.spyOn(scenario, 'sendEvent');\n  const url = BffRoute")
    .replace("  expect((await fetch(url, { method: 'POST' })).status).toBe(204);\n  expect(publish).toHaveBeenCalledTimes(1);", "  expect((await fetch(url, { method: 'POST' })).status).toBe(204);\n  expect(publish).toHaveBeenCalledTimes(1);\n  await capture('06-ack-after', 'Acknowledgement clears the failed task; replay publishes no extra event', {publishedEvents: publish.mock.calls.length});")],
  ['unassigned-keys.test.tsx', (code) => code
    .replace("    scenario.completeDelete([target.keys[0].id]);", "    await capture(\`07-delete-\${failed ? 'failure' : 'success'}-pending\`, 'Delete command accepted; the key is pending');\n    scenario.completeDelete([target.keys[0].id]);")
    .replace("      // A failed task does not block Delete", "      await row.getByRole('button', {name: 'The appliance could not delete this key.'}).click();\n      await capture('07-delete-failed', 'task.failed exposes the deletion error and acknowledgement control');\n      await userEvent.keyboard('{Escape}');\n      // A failed task does not block Delete")
    .replace("      await expect.element(row.getByRole('button', { name: 'An operation is in progress.' })).not.toBeInTheDocument();", "      await expect.element(row.getByRole('button', { name: 'An operation is in progress.' })).not.toBeInTheDocument();\n      await capture('07-delete-failure-acknowledged', 'Acknowledgement clears the deletion error in place');")
    .replace("      await expect.element(page.getByText(target.keys[0].name!, { exact: true })).not.toBeInTheDocument();", "      await expect.element(page.getByText(target.keys[0].name!, { exact: true })).not.toBeInTheDocument();\n      await capture('07-delete-completed', 'Successful deletion removes the key without a page reload');")],
]);

export default (env) => {
  const config = baseConfig(env);
  config.define.__PORTAL3784_EVIDENCE_DIR__ = JSON.stringify(evidenceDir);
  config.plugins.unshift({
    name: 'portal-3784-evidence-only',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('?')[0];
      if (!file.startsWith(path.join(root, 'tests/int/routes/_authed.encryption-keys/'))) return;
      const transform = sources.get(path.basename(file));
      if (!transform) return;
      return {code: "import {capture} from '" + path.join(root, '.local/portal-3784-evidence/capture-support.ts') + "';\nimport {page as browserPage} from 'vitest/browser';\n" + transform(code).replace("import { page as browserPage } from 'vitest/browser';", ''), map: null};
    },
  });
  config.test.projects = config.test.projects.filter((p) => p.test?.name?.label === 'int').map((p) => ({
    ...p,
    test: {
      ...p.test,
      maxWorkers: 1,
      include: [...p.test.include, './.local/portal-3784-evidence/external.capture.test.tsx'],
      testTimeout: 20000,
      browser: {
        ...p.test.browser,
        viewport: {width: 1440, height: 1050},
        commands: {
          recordEvidence: async (_context, name, payload) => {
            await writeFile(path.join(evidenceDir, name + '.json'), JSON.stringify(payload, null, 2) + '\n');
          },
        },
      },
    },
  }));
  return config;
};

