import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getUsers } from '@/features/users/api/getUsers'
import type { UserDto, UserType } from '@/features/users/types'
import type { ListResponse } from '@/types/api'

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]
const DEFAULT_SIZE = 10

function parseSize(raw: string | null): number {
  const n = parseInt(raw ?? '', 10)
  return PAGE_SIZE_OPTIONS.includes(n) ? n : DEFAULT_SIZE
}

function parsePage(raw: string | null): number {
  const n = parseInt(raw ?? '', 10)
  return n > 0 ? n : 1
}

export function useUsers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState<ListResponse<UserDto> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // All filter state derived from URL
  const page = parsePage(searchParams.get('page'))
  const size = parseSize(searchParams.get('size'))
  const typeFilter = (searchParams.get('type') as UserType) || undefined
  const keyword = searchParams.get('keyword') ?? ''

  // Debounce keyword for the API call only
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)
  useEffect(() => {
    const id = setTimeout(() => setDebouncedKeyword(keyword), 300)
    return () => clearTimeout(id)
  }, [keyword])

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getUsers({
        page,
        size,
        type: typeFilter,
        keyword: debouncedKeyword || undefined,
      })
      setData(result)
    } catch {
      setError('Không thể tải danh sách người dùng.')
    } finally {
      setIsLoading(false)
    }
  }, [page, size, typeFilter, debouncedKeyword])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  function updateParams(updates: Record<string, string | undefined>) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        for (const [key, val] of Object.entries(updates)) {
          if (val === undefined || val === '') next.delete(key)
          else next.set(key, val)
        }
        return next
      },
      { replace: true },
    )
  }

  function setPage(p: number) {
    updateParams({ page: p === 1 ? undefined : String(p) })
  }

  function changeTypeFilter(type: UserType | undefined) {
    updateParams({ type, page: undefined })
  }

  function changeKeyword(kw: string) {
    updateParams({ keyword: kw || undefined, page: undefined })
  }

  function changeSize(s: number) {
    updateParams({ size: s === DEFAULT_SIZE ? undefined : String(s), page: undefined })
  }

  return {
    users: data?.items ?? [],
    metadata: data?.metadata ?? null,
    isLoading,
    error,
    page,
    size,
    setPage,
    typeFilter,
    changeTypeFilter,
    keyword,
    changeKeyword,
    changeSize,
    refresh: fetchData,
  }
}
