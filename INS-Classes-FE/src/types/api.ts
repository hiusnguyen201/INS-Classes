/** Response envelope returned by every BE endpoint: `{ data, error? }` */
export interface ApiResponse<T> {
  data: T | null
  error?: ApiErrorBody
}

export interface ApiErrorBody {
  code: string
  message: string
}

export interface PageMetadata {
  page: number
  size: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/** Paginated list payload: `{ items, metadata }` */
export interface ListResponse<T> {
  items: T[]
  metadata: PageMetadata
}
