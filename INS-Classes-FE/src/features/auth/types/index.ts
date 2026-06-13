export type UserType = 'ADMIN' | 'TEACHER' | 'USER'

export interface UserDto {
  id: string
  type: UserType
  avatar: string | null
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface AuthDto {
  accessToken: string
  refreshToken: string
  user: UserDto
}

export interface LoginInput {
  email: string
  password: string
}
