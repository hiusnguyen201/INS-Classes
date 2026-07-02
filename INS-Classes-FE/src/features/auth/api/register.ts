import { http } from '@/lib/http'
import type { AuthDto, RegisterInput } from '@/features/auth/types'

export function register(input: RegisterInput): Promise<AuthDto> {
  return http.post<AuthDto>('/auth/register', input)
}
