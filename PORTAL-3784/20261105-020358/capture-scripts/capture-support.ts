import {beforeEach, onTestFinished, vi} from 'vitest';
import {page, commands} from 'vitest/browser';
import {SSEScenario} from '@msw-portal/webbffsse/scenarios';
import {SSEConnectionManager} from '@webbffsse/connection-manager';

let events = [];
let receivedEvents = [];
let requests = [];
const originalSend = SSEScenario.prototype.sendEvent;
const originalSubscribe = SSEConnectionManager.prototype.subscribe;

beforeEach(() => {
  events = [];
  receivedEvents = [];
  requests = [];
  vi.spyOn(SSEScenario.prototype, 'sendEvent').mockImplementation(function(event) {
    events.push({publishedAt: new Date().toISOString(), ...event});
    return originalSend.call(this, event);
  });
  vi.spyOn(SSEConnectionManager.prototype, 'subscribe').mockImplementation(function(topics, onEvent, onError) {
    return originalSubscribe.call(this, topics, (event) => {
      receivedEvents.push({receivedAt: new Date().toISOString(), ...event});
      return onEvent(event);
    }, onError);
  });
  const previousFetch = window.fetch;
  const fetch = previousFetch.bind(window);
  window.fetch = async (input, options) => {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url, window.location.origin);
    const relevant = url.pathname.includes('encryption-keys') || url.pathname.includes('/acknowledge');
    const entry = {method: options?.method ?? 'GET', path: url.pathname, query: url.search, status: 'pending'};
    if (relevant) requests.push(entry);
    try {
      const response = await fetch(input, options);
      entry.status = response.status;
      return response;
    } catch (error) {
      entry.status = options?.signal?.aborted ? 'aborted' : 'failed';
      throw error;
    }
  };
  onTestFinished(() => { window.fetch = previousFetch; });
});

export async function capture(name, title, facts = {}) {
  const payload = {name, title, capturedAt: new Date().toISOString(), environment: 'Chromium browser integration; simulated backend via MSW; real EventSource and React Query', facts, publishedEvents: [...events], receivedEvents: [...receivedEvents], requests: requests.map((request) => ({...request}))};
  const panel = document.createElement('aside');
  panel.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2147483647;background:#0f172a;color:#f8fafc;padding:12px 20px;font:12px/1.5 monospace;box-shadow:0 -2px 12px #0004;pointer-events:none';
  const heading = document.createElement('strong');
  heading.textContent = 'PORTAL-3784 | SIMULATED BACKEND · REAL BROWSER + EVENTSOURCE';
  panel.appendChild(heading);
  for (const line of [
    title,
    Object.keys(facts).length ? 'Observed: ' + JSON.stringify(facts) : '',
    'Latest received SSE: ' + (receivedEvents.at(-1) ? JSON.stringify(receivedEvents.at(-1)) : 'none received yet'),
    'HTTP: ' + requests.slice(-5).map((r) => r.method + ' ' + r.path + ' → ' + r.status).join(' | '),
  ].filter(Boolean)) {
    const text = document.createElement('div');
    text.style.cssText = 'overflow-wrap:anywhere;white-space:normal';
    text.textContent = line;
    panel.appendChild(text);
  }
  document.body.appendChild(panel);
  const previousHeight = document.body.style.minHeight;
  document.body.style.minHeight = '1050px';
  try {
    await page.screenshot({path: __PORTAL3784_EVIDENCE_DIR__ + '/' + name + '.png', animations: 'disabled'});
    await commands.recordEvidence(name, payload);
  } finally {
    panel.remove();
    document.body.style.minHeight = previousHeight;
  }
}

