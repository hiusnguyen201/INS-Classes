import { env } from '@/config/env'
import { tokenStorage } from '@/lib/storage'
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

// Queue of waiters while a token refresh is in-flight
type QueueEntry = { resolve: (token: string) => void; reject: (err: unknown) => void }
let isRefreshing = false
const refreshQueue: QueueEntry[] = []

async function refreshTokens(): Promise<string> {
  const refreshToken = tokenStorage.getRefreshToken()
  if (!refreshToken) throw new HttpError(401, 'UNAUTHORIZED', 'Phiên đăng nhập đã hết hạn.')

  const res = await fetch(`${env.apiUrl}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })
  const body = (await res.json().catch(() => null)) as ApiResponse<{
    accessToken: string
    refreshToken: string
  }> | null

  if (!res.ok || body?.error || !body?.data) {
    tokenStorage.clear()
    window.location.href = '/login'
    throw new HttpError(401, 'UNAUTHORIZED', 'Phiên đăng nhập đã hết hạn.')
  }

  tokenStorage.updateTokens(body.data)
  return body.data.accessToken
}

async function withRefresh<T>(path: string, init: RequestInit): Promise<T> {
  if (isRefreshing) {
    // Another request is already refreshing — wait for it
    const newToken = await new Promise<string>((resolve, reject) => {
      refreshQueue.push({ resolve, reject })
    })
    return executeRequest<T>(path, init, newToken)
  }

  isRefreshing = true
  let newToken: string
  try {
    newToken = await refreshTokens()
    refreshQueue.splice(0).forEach((entry) => entry.resolve(newToken))
  } catch (err) {
    refreshQueue.splice(0).forEach((entry) => entry.reject(err))
    throw err
  } finally {
    isRefreshing = false
  }

  return executeRequest<T>(path, init, newToken)
}

async function executeRequest<T>(path: string, init: RequestInit, token: string | null): Promise<T> {
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}

  let res: Response
  try {
    res = await fetch(`${env.apiUrl}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...authHeaders, ...init.headers } as HeadersInit,
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

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = tokenStorage.getAccessToken()

  try {
    return await executeRequest<T>(path, init, token)
  } catch (err) {
    if (err instanceof HttpError && err.code === 'TOKEN_EXPIRED') {
      return withRefresh<T>(path, init)
    }
    throw err
  }
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
