import { http } from '@/lib/http'
import type { UserDto, CreateUserInput } from '@/features/users/types'

export function createUser(input: CreateUserInput): Promise<UserDto> {
  return http.post<UserDto>('/users', input)
}
