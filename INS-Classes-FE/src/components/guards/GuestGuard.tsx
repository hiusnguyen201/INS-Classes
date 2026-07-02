import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PATHS } from '@/config/paths'

export function GuestGuard({ children }: { children: ReactNode }) {
  const { isAuthorized } = useAuth()
  if (isAuthorized) return <Navigate to={PATHS.adminDashboard} replace />
  return <>{children}</>
}
