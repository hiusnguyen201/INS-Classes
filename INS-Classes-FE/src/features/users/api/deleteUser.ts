import { http } from '@/lib/http'

export function deleteUser(id: string): Promise<void> {
  return http.delete<void>(`/users/${id}`)
}
