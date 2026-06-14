export enum UserType {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  USER = 'USER',
}

export interface UserDto {
  id: string
  name: string
  email: string
  type: UserType
  avatar: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateUserInput {
  name: string
  email: string
  type: UserType
  password: string
}

export interface UpdateUserInput {
  name?: string
  type?: UserType
}
