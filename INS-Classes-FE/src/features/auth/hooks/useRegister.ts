import { useState } from 'react'
import { HttpError } from '@/lib/http'
import { register } from '@/features/auth/api/register'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { RegisterInput } from '@/features/auth/types'

export function useRegister() {
  const { startSession } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(input: RegisterInput): Promise<boolean> {
    setIsLoading(true)
    setError(null)
    try {
      startSession(await register(input), false)
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
