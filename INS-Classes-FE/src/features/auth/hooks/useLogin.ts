import { useState } from 'react'
import { HttpError } from '@/lib/http'
import { login } from '@/features/auth/api/login'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { LoginInput } from '@/features/auth/types'

export function useLogin() {
  const { startSession } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(input: LoginInput, remember: boolean): Promise<boolean> {
    setIsLoading(true)
    setError(null)
    try {
      startSession(await login(input), remember)
      return true
    } catch (e) {
      setError(e instanceof HttpError ? e.message : 'Có lỗi xảy ra, vui lòng thử lại.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { submit, isLoading, error }
}
