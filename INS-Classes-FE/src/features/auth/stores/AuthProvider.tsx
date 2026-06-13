import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { tokenStorage } from '@/lib/storage'
import { AuthContext } from '@/features/auth/stores/auth-context'
import type { AuthDto, UserDto } from '@/features/auth/types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null)

  const startSession = useCallback((auth: AuthDto, remember: boolean) => {
    tokenStorage.save(auth, remember)
    setUser(auth.user)
  }, [])

  const clearSession = useCallback(() => {
    tokenStorage.clear()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, startSession, clearSession }),
    [user, startSession, clearSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
