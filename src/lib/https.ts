import { toast } from '@/components/ui/toast';

const baseUrl = import.meta.env.VITE_BACKEND_URL || '';

type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | readonly QueryValue[]>;
export type HttpConfig = Omit<RequestInit, 'method' | 'body'>;
export interface HttpOptions {
  headers?: HeadersInit;
  formData?: boolean;
  /** Disable automatic error toasts when the caller handles notifications. */
  toastErrors?: boolean;
}

export class HttpError extends Error {
  readonly status: number;
  readonly data: unknown;
  readonly url: string;

  constructor(message: string, response: Response, data: unknown, url: string) {
    super(message);
    this.name = 'HttpError';
    this.status = response.status;
    this.data = data;
    this.url = url;
  }
}

function buildUrl(path: string, params?: QueryParams): string {
  const joined = /^https?:\/\//i.test(path)
    ? path
    : `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  const hashIndex = joined.indexOf('#');
  const hash = hashIndex < 0 ? '' : joined.slice(hashIndex);
  const withoutHash = hashIndex < 0 ? joined : joined.slice(0, hashIndex);
  const queryIndex = withoutHash.indexOf('?');
  const pathname = queryIndex < 0 ? withoutHash : withoutHash.slice(0, queryIndex);
  const query = new URLSearchParams(queryIndex < 0 ? '' : withoutHash.slice(queryIndex + 1));

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value == null) continue;
    query.delete(key);
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item != null) query.append(key, String(item));
    }
  }

  const search = query.toString();
  return `${pathname}${search ? `?${search}` : ''}${hash}`;
}

function errorMessages(data: unknown, status: number): string[] {
  const details = typeof data === 'object' && data !== null
    ? data as Record<string, unknown>
    : {};
  const validation = typeof details.errors === 'object' && details.errors !== null
    ? Object.values(details.errors).flat()
    : [];
  const messages = validation.filter(
    (value): value is string => typeof value === 'string' && value.trim().length > 0,
  );
  if (messages.length) return [...new Set(messages)];

  const message = [details.error, details.errors, details.message].find(
    (value): value is string => typeof value === 'string' && value.trim().length > 0,
  );
  // Avoid displaying raw HTML returned by proxies or error pages.
  return [message ?? (status === 401 ? 'Unauthorized' : `HTTP Error: ${status}`)];
}

async function readResponse(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) return null;
  const text = await response.text();
  if (!text.trim()) return null;

  try {
    // Also support JSON APIs that omit the Content-Type header.
    return JSON.parse(text) as unknown;
  } catch {
    const contentType = response.headers.get('content-type') ?? '';
    if (response.ok && /(?:application\/json|\+json)\b/i.test(contentType)) {
      throw new Error('The server returned invalid JSON');
    }
    return text;
  }
}

async function request<T>(
  method: string,
  path: string,
  data: unknown,
  options: HttpOptions,
  config: HttpConfig,
  params?: QueryParams,
): Promise<T | null> {
  const url = buildUrl(path, params);
  const headers = new Headers({ Accept: 'application/json' });
  new Headers(options.headers).forEach((value, key) => headers.set(key, value));
  new Headers(config.headers).forEach((value, key) => headers.set(key, value));

  // Authentication is intentionally disabled until the auth flow is ready.
  let body: BodyInit | undefined;
  if (data !== undefined) {
    if (data instanceof FormData) {
      body = data;
      // The browser supplies the multipart boundary.
      headers.delete('Content-Type');
    } else {
      if (options.formData) throw new TypeError('Expected FormData when formData is enabled');
      body = JSON.stringify(data);
      if (body !== undefined && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
    }
  }

  let messages: string[] = [];
  try {
    const response = await fetch(url, { ...config, method, headers, body });
    const result = await readResponse(response);
    if (!response.ok) {
      messages = errorMessages(result, response.status);
      throw new HttpError(messages.join('; '), response, result, url);
    }
    // T describes the expected response; callers must validate untrusted data if needed.
    return result as T | null;
  } catch (error) {
    const aborted = config.signal?.aborted
      || (error instanceof Error && error.name === 'AbortError');
    if (!aborted && options.toastErrors !== false) {
      if (!messages.length) {
        messages = [error instanceof Error ? error.message : 'Request failed'];
      }
      for (const title of messages) toast.add({ title, type: 'error' });
    }
    throw error;
  }
}

// Keep existing argument ordering so callers do not need to migrate.
const get = <T = unknown>(
  url: string,
  config: HttpConfig = {},
  params?: QueryParams,
  options: HttpOptions = {},
): Promise<T | null> => request<T>('GET', url, undefined, options, config, params);

const post = <TResponse = unknown, TData = unknown>(
  url: string,
  data?: TData,
  options: HttpOptions = {},
  config: HttpConfig = {},
): Promise<TResponse | null> => request<TResponse>('POST', url, data, options, config);

const update = <TResponse = unknown, TData = unknown>(
  url: string,
  data?: TData,
  options: HttpOptions = {},
  config: HttpConfig = {},
): Promise<TResponse | null> => request<TResponse>('PUT', url, data, options, config);

const destroy = <TResponse = unknown, TData = unknown>(
  url: string,
  data?: TData,
  options: HttpOptions = {},
  config: HttpConfig = {},
): Promise<TResponse | null> => request<TResponse>('DELETE', url, data, options, config);

export default { get, post, update, destroy };
