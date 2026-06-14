import { useState, useEffect, useCallback } from 'react'
import { getUsers } from '@/features/users/api/getUsers'
import type { UserDto, UserType } from '@/features/users/types'
import type { ListResponse } from '@/types/api'

const PAGE_SIZE = 10

export function useUsers() {
  const [data, setData] = useState<ListResponse<UserDto> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [typeFilter, setTypeFilter] = useState<UserType | undefined>(undefined)
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword, setDebouncedKeyword] = useState('')

  useEffect(() => {
    const id = setTimeout(() => setDebouncedKeyword(keyword), 300)
    return () => clearTimeout(id)
  }, [keyword])

  const fetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getUsers({
        page,
        size: PAGE_SIZE,
        type: typeFilter,
        keyword: debouncedKeyword || undefined,
      })
      setData(result)
    } catch {
      setError('Không thể tải danh sách người dùng.')
    } finally {
      setIsLoading(false)
    }
  }, [page, typeFilter, debouncedKeyword])

  useEffect(() => {
    fetch()
  }, [fetch])

  function changeTypeFilter(type: UserType | undefined) {
    setTypeFilter(type)
    setPage(1)
  }

  function changeKeyword(kw: string) {
    setKeyword(kw)
    setPage(1)
  }

  return {
    users: data?.items ?? [],
    metadata: data?.metadata ?? null,
    isLoading,
    error,
    page,
    setPage,
    typeFilter,
    changeTypeFilter,
    keyword,
    changeKeyword,
    refresh: fetch,
  }
}
