import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { tokenStorage } from '@/lib/storage'
import { AuthContext } from '@/features/auth/stores/auth-context'
import type { AuthDto, UserDto } from '@/features/auth/types'

function tryDecodeToken(token: string): boolean {
  try {
    const payload = token.split('.')[1]
    // base64url → base64 (JWT uses url-safe alphabet)
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '=='.slice(0, (4 - (base64.length % 4)) % 4)
    JSON.parse(atob(padded))
    return true
  } catch {
    return false
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null)

  // Sync init: decode token from storage on first render — no async, no flash
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    const token = tokenStorage.getAccessToken()
    if (!token) return false
    const ok = tryDecodeToken(token)
    if (!ok) tokenStorage.clear()
    return ok
  })

  const startSession = useCallback((auth: AuthDto, remember: boolean) => {
    tokenStorage.save(auth, remember)
    setUser(auth.user)
    setIsAuthorized(true)
  }, [])

  const clearSession = useCallback(() => {
    tokenStorage.clear()
    setUser(null)
    setIsAuthorized(false)
  }, [])

  const value = useMemo(
    () => ({ user, isAuthorized, startSession, clearSession }),
    [user, isAuthorized, startSession, clearSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
