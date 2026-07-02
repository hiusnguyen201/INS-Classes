import { useState } from 'react'
import { HttpError } from '@/lib/http'
import { deleteUser } from '@/features/users/api/deleteUser'

export function useDeleteUser(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(id: string): Promise<boolean> {
    setIsLoading(true)
    setError(null)
    try {
      await deleteUser(id)
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
