const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const ts = require('typescript');

// Compile the real helper, replacing only its Vite environment and UI dependency.
const source = readFileSync('src/lib/https.ts', 'utf8')
  .replace("import { toast } from '@/components/ui/toast';", '')
  .replace('import.meta.env.VITE_BACKEND_URL', "'https://api.example.test/v1/'");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const notifications = [];
const compiled = {};
new Function('exports', 'toast', outputText)(compiled, {
  add: (notification) => notifications.push(notification),
});
const http = compiled.default;
const { HttpError } = compiled;
const originalFetch = globalThis.fetch;
after(() => { globalThis.fetch = originalFetch; });

function respond(body, init = {}) {
  notifications.length = 0;
  globalThis.fetch = async () => new Response(body, init);
}

test('joins URLs, preserves existing queries and encodes repeated parameters', async () => {
  globalThis.fetch = async (url, config) => {
    assert.equal(url, 'https://api.example.test/v1/users?sort=name&tag=a%26b&tag=c&active=false#results');
    assert.equal(config.method, 'GET');
    assert.equal(config.headers.has('Content-Type'), false);
    return Response.json([]);
  };
  await http.get('/users?sort=name#results', {}, { tag: ['a&b', 'c'], active: false, skip: null });
});

test('merges all header forms and serializes JSON', async () => {
  globalThis.fetch = async (url, config) => {
    assert.equal(url, 'https://other.example.test/items');
    assert.equal(config.headers.get('Accept'), 'application/json');
    assert.equal(config.headers.get('X-Option'), 'yes');
    assert.equal(config.headers.get('X-Config'), 'yes');
    assert.equal(config.headers.get('Content-Type'), 'application/custom+json');
    assert.equal(config.body, '{"name":"test"}');
    return Response.json({ id: 1 });
  };
  assert.deepEqual(await http.post('https://other.example.test/items', { name: 'test' },
    { headers: [['X-Option', 'yes']] },
    { headers: new Headers({ 'X-Config': 'yes', 'Content-Type': 'application/custom+json' }) }), { id: 1 });
});

test('detects FormData and lets the browser set its boundary', async () => {
  const data = new FormData();
  data.append('name', 'test');
  globalThis.fetch = async (_url, config) => {
    assert.equal(config.body, data);
    assert.equal(config.headers.has('Content-Type'), false);
    return new Response(null, { status: 204 });
  };
  assert.equal(await http.update('upload', data, { headers: { 'Content-Type': 'application/json' } }), null);
  await assert.rejects(http.post('upload', {}, { formData: true }), TypeError);
});

test('handles empty, text, and JSON success responses', async () => {
  for (const [body, init, expected] of [
    [null, { status: 204 }, null], [null, { status: 205 }, null],
    ['', {}, null], ['hello', {}, 'hello'], ['{"ok":true}', {}, { ok: true }],
  ]) {
    respond(body, init);
    assert.deepEqual(await http.get('result'), expected);
  }
});

test('rejects HTTP errors with status and payload, and deduplicates validation toasts', async () => {
  for (const [status, data] of [[401, { message: 'Sign in' }], [422, { errors: { name: ['Required', 'Required'] } }]]) {
    respond(JSON.stringify(data), { status });
    await assert.rejects(http.get('result'), (error) => {
      assert.ok(error instanceof HttpError);
      assert.equal(error.status, status);
      assert.deepEqual(error.data, data);
      return true;
    });
    assert.equal(notifications.length, 1);
  }
});

test('handles HTML and empty errors without losing HTTP status', async () => {
  for (const body of ['<html>Bad gateway</html>', null]) {
    respond(body, { status: 502 });
    await assert.rejects(http.get('result'), (error) => error.status === 502);
    assert.equal(notifications[0].title, 'HTTP Error: 502');
  }
});

test('supports silent errors and rejects malformed JSON successes', async () => {
  respond('{broken', { headers: { 'Content-Type': 'application/json' } });
  await assert.rejects(http.get('result', {}, undefined, { toastErrors: false }), /invalid JSON/);
  assert.equal(notifications.length, 0);
  respond('{}', { status: 500 });
  await assert.rejects(http.get('result', {}, undefined, { toastErrors: false }), HttpError);
  assert.equal(notifications.length, 0);
});

test('preserves cancellation and network errors, only notifying for network errors', async () => {
  notifications.length = 0;
  const controller = new AbortController();
  controller.abort();
  globalThis.fetch = async (_url, config) => {
    assert.equal(config.signal, controller.signal);
    throw controller.signal.reason;
  };
  await assert.rejects(http.get('result', { signal: controller.signal }), { name: 'AbortError' });
  assert.equal(notifications.length, 0);
  const networkError = new TypeError('Failed to fetch');
  globalThis.fetch = async () => { throw networkError; };
  await assert.rejects(http.get('result'), (error) => error === networkError);
  assert.equal(notifications.length, 1);
});

test('DELETE permits an omitted body', async () => {
  globalThis.fetch = async (_url, config) => {
    assert.equal(config.method, 'DELETE');
    assert.equal(config.body, undefined);
    return new Response(null, { status: 204 });
  };
  assert.equal(await http.destroy('items/1'), null);
});
