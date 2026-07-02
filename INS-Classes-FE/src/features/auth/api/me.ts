import { http } from '@/lib/http'
import type { UserDto } from '@/features/auth/types'

export function getMe(): Promise<UserDto> {
  return http.get<UserDto>('/auth/me')
}
