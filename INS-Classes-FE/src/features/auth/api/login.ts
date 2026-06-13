import { http } from '@/lib/http'
import type { AuthDto, LoginInput } from '@/features/auth/types'

export function login(input: LoginInput): Promise<AuthDto> {
  return http.post<AuthDto>('/auth/login', input)
}
