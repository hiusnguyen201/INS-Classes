import { useState } from 'react'
import { HttpError } from '@/lib/http'
import { createUser } from '@/features/users/api/createUser'
import type { CreateUserInput } from '@/features/users/types'

export function generatePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = 'Ins@'
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function useCreateUser(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(input: CreateUserInput): Promise<boolean> {
    setIsLoading(true)
    setError(null)
    try {
      await createUser(input)
      onSuccess()
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
