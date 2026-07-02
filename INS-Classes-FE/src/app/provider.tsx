import type { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from '@/features/auth/stores/AuthProvider'
import { theme } from '@/app/theme'

/** Single place to stack app-wide providers. */
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
