import { http } from '@/lib/http'

export function checkEmailExists(email: string): Promise<boolean> {
  return http.get<boolean>(`/users/check-email?email=${encodeURIComponent(email)}`)
}
