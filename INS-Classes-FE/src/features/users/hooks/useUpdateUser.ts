import { useState } from 'react'
import { HttpError } from '@/lib/http'
import { updateUser } from '@/features/users/api/updateUser'
import type { UpdateUserInput } from '@/features/users/types'

export function useUpdateUser(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(id: string, input: UpdateUserInput): Promise<boolean> {
    setIsLoading(true)
    setError(null)
    try {
      await updateUser(id, input)
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
