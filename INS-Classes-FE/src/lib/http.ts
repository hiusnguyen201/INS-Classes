import { env } from '@/config/env'
import type { ApiResponse } from '@/types/api'

const GENERIC_MESSAGE = 'Có lỗi xảy ra, vui lòng thử lại.'

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${env.apiUrl}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init.headers },
    })
  } catch {
    throw new HttpError(0, 'NETWORK_ERROR', 'Không thể kết nối máy chủ, vui lòng kiểm tra lại.')
  }

  const body = (await res.json().catch(() => null)) as ApiResponse<T> | null
  if (!res.ok || body?.error) {
    throw new HttpError(
      res.status,
      body?.error?.code ?? 'UNKNOWN_ERROR',
      body?.error?.message ?? GENERIC_MESSAGE,
    )
  }
  if (!body) {
    throw new HttpError(res.status, 'INVALID_RESPONSE', GENERIC_MESSAGE)
  }
  return body.data as T
}

export const http = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, init),
  post: <T>(path: string, data?: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: 'POST',
      body: data === undefined ? undefined : JSON.stringify(data),
    }),
  put: <T>(path: string, data?: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: 'PUT',
      body: data === undefined ? undefined : JSON.stringify(data),
    }),
  delete: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { ...init, method: 'DELETE' }),
}
