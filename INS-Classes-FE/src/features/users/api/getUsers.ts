import { http } from '@/lib/http'
import type { ListResponse } from '@/types/api'
import type { UserDto, UserType } from '@/features/users/types'

export interface GetUsersParams {
  page?: number
  size?: number
  type?: UserType
  keyword?: string
}

export function getUsers(params: GetUsersParams = {}): Promise<ListResponse<UserDto>> {
  const query = new URLSearchParams()
  if (params.page !== undefined) query.set('page', String(params.page))
  if (params.size !== undefined) query.set('size', String(params.size))
  if (params.type) query.set('type', params.type)
  if (params.keyword) query.set('keyword', params.keyword)
  const qs = query.toString()
  return http.get<ListResponse<UserDto>>(`/users${qs ? `?${qs}` : ''}`)
}
