import { http } from '@/lib/http'
import type { UserDto, UpdateUserInput } from '@/features/users/types'

export function updateUser(id: string, input: UpdateUserInput): Promise<UserDto> {
  return http.put<UserDto>(`/users/${id}`, input)
}
