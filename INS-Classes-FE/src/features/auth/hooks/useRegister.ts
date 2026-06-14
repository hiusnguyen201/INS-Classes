import { useState } from 'react'
import { HttpError } from '@/lib/http'
import { register } from '@/features/auth/api/register'
import type { AuthDto, RegisterInput } from '@/features/auth/types'

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(input: RegisterInput): Promise<AuthDto | null> {
    setIsLoading(true)
    setError(null)
    try {
      return await register(input)
    } catch (e) {
      setError(e instanceof HttpError ? e.message : 'Có lỗi xảy ra, vui lòng thử lại.')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { submit, isLoading, error }
}
