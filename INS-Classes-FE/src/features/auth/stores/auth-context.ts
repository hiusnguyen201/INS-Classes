import { createContext } from 'react'
import type { AuthDto, UserDto } from '@/features/auth/types'

export interface AuthContextValue {
  user: UserDto | null
  /** Persist tokens (per "remember me") and set the current user. */
  startSession: (auth: AuthDto, remember: boolean) => void
  clearSession: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
