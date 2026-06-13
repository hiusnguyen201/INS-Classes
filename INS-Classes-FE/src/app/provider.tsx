import type { ReactNode } from 'react'
import { AuthProvider } from '@/features/auth/stores/AuthProvider'

/** Single place to stack app-wide providers. */
export function AppProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
