import { useState } from 'react'
import { UserType, type UserDto } from '@/features/users/types'
import { useUsers } from '@/features/users/hooks/useUsers'
import { UserAvatarInitials } from '@/features/users/components/UserAvatarInitials'
import { UserTypeBadge } from '@/features/users/components/UserTypeBadge'
import { CreateUserModal } from '@/features/users/components/CreateUserModal'
import { UpdateUserModal } from '@/features/users/components/UpdateUserModal'
import { DeleteUserModal } from '@/features/users/components/DeleteUserModal'
import {
  PlusIcon,
  UploadIcon,
  DownloadIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/ui/icons'
import { cn } from '@/utils/cn'

const TAB_FILTERS: { label: string; value: UserType | undefined }[] = [
  { label: 'Tất cả', value: undefined },
  { label: 'Admin', value: UserType.ADMIN },
  { label: 'Giảng viên', value: UserType.TEACHER },
  { label: 'Học viên', value: UserType.USER },
]

export function UsersPage() {
  const {
    users,
    metadata,
    isLoading,
    error,
    page,
    setPage,
    typeFilter,
    changeTypeFilter,
    keyword,
    changeKeyword,
    refresh,
  } = useUsers()

  const [showCreate, setShowCreate] = useState(false)
  const [editUser, setEditUser] = useState<UserDto | null>(null)
  const [deleteUser, setDeleteUser] = useState<UserDto | null>(null)

  const totalPages = metadata?.totalPages ?? 1
  const totalCount = metadata?.totalCount ?? 0
  const startItem = metadata ? (page - 1) * 10 + 1 : 0
  const endItem = metadata ? Math.min(page * 10, totalCount) : 0

  function getPageNumbers(): number[] {
    const pages: number[] = []
    const start = Math.max(1, page - 1)
    const end = Math.min(totalPages, start + 2)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <>
      {/* Page header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-[23px] font-bold tracking-[-0.46px] text-ink">Người dùng</h1>
          <p className="mt-1 text-[14px] text-muted">
            {totalCount > 0 ? `${totalCount} tài khoản trong hệ thống` : 'Đang tải...'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            disabled
            className="flex h-10 items-center gap-2 rounded-[8px] border border-edge bg-white px-4 text-[14px] font-semibold text-ink shadow-[0px_1px_1px_rgba(31,39,51,0.06),0px_1px_1.5px_rgba(31,39,51,0.05)] opacity-50 cursor-not-allowed"
          >
            <UploadIcon className="size-[17px]" />
            Nhập Excel
          </button>
          <button
            disabled
            className="flex h-10 items-center gap-2 rounded-[8px] border border-edge bg-white px-4 text-[14px] font-semibold text-ink shadow-[0px_1px_1px_rgba(31,39,51,0.06),0px_1px_1.5px_rgba(31,39,51,0.05)] opacity-50 cursor-not-allowed"
          >
            <DownloadIcon className="size-[17px]" />
            Xuất Excel
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="flex h-10 items-center gap-2 rounded-[8px] bg-primary px-4 text-[14px] font-semibold text-white shadow-[0px_2px_8px_-2px_#2563eb] hover:bg-primary-dark"
          >
            <PlusIcon className="size-[17px]" />
            Thêm người dùng
          </button>
        </div>
      </div>

      {/* Filters + search row */}
      <div className="mb-4 flex items-center justify-between gap-4">
        {/* Tab filters */}
        <div className="flex items-center rounded-[10px] border border-line bg-white p-1">
          {TAB_FILTERS.map(({ label, value }) => {
            const active = typeFilter === value
            return (
              <button
                key={label}
                onClick={() => changeTypeFilter(value)}
                className={cn(
                  'rounded-[7px] px-4 py-1.5 text-[13.5px] font-semibold transition-colors',
                  active ? 'bg-ring-soft text-primary' : 'text-muted hover:text-label',
                )}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="flex h-10 w-64 items-center gap-2 rounded-[9px] border border-line bg-white px-3">
          <SearchIcon className="size-[17px] shrink-0 text-faint" />
          <input
            value={keyword}
            onChange={(e) => changeKeyword(e.target.value)}
            placeholder="Tìm tên, email..."
            className="w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-[#757575]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[14px] border border-line bg-white shadow-[0px_1px_1px_rgba(31,39,51,0.06),0px_1px_1.5px_rgba(31,39,51,0.05)]">
        {/* Table header */}
        <div className="flex border-b border-line px-5 py-2.5">
          <div className="w-[38%] text-[11.5px] font-bold uppercase tracking-[0.46px] text-muted">Người dùng</div>
          <div className="w-[30%] text-[11.5px] font-bold uppercase tracking-[0.46px] text-muted">Email</div>
          <div className="w-[16%] text-[11.5px] font-bold uppercase tracking-[0.46px] text-muted">Loại</div>
          <div className="ml-auto text-right text-[11.5px] font-bold uppercase tracking-[0.46px] text-muted">Thao tác</div>
        </div>

        {/* Rows */}
        {isLoading && (
          <div className="py-16 text-center text-[14px] text-muted">Đang tải...</div>
        )}
        {error && !isLoading && (
          <div className="py-16 text-center text-[14px] text-red-500">{error}</div>
        )}
        {!isLoading && !error && users.length === 0 && (
          <div className="py-16 text-center text-[14px] text-muted">Không có người dùng nào.</div>
        )}
        {!isLoading && users.map((user) => (
          <div key={user.id} className="flex items-center border-b border-line px-5 py-3 last:border-b-0">
            {/* Avatar + name */}
            <div className="flex w-[38%] items-center gap-3">
              <UserAvatarInitials name={user.name} className="size-9" />
              <span className="text-[14px] font-medium text-ink">{user.name}</span>
            </div>
            {/* Email */}
            <div className="w-[30%] text-[13px] text-label">{user.email}</div>
            {/* Type badge */}
            <div className="w-[16%]">
              <UserTypeBadge type={user.type} />
            </div>
            {/* Actions */}
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={() => setEditUser(user)}
                className="text-faint hover:text-primary transition-colors"
                title="Sửa"
              >
                <EditIcon className="size-5" />
              </button>
              <button
                onClick={() => setDeleteUser(user)}
                className="text-faint hover:text-[#d93025] transition-colors"
                title="Xoá"
              >
                <TrashIcon className="size-5" />
              </button>
            </div>
          </div>
        ))}

        {/* Pagination footer */}
        {!isLoading && users.length > 0 && (
          <div className="flex items-center justify-between border-t border-line bg-[#f5f7fa] px-5 py-4">
            <p className="text-[13px] text-muted">
              Hiển thị {startItem}–{endItem} trong {totalCount} kết quả
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex size-[34px] items-center justify-center rounded-[8px] border border-line bg-white text-label hover:bg-[#f5f7fa] disabled:opacity-40"
              >
                <ChevronLeftIcon className="size-4" />
              </button>
              {getPageNumbers().map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    'flex size-[34px] items-center justify-center rounded-[8px] border text-[13.5px] font-semibold transition-colors',
                    p === page
                      ? 'border-primary bg-primary text-white'
                      : 'border-line bg-white text-label hover:bg-[#f5f7fa]',
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex size-[34px] items-center justify-center rounded-[8px] border border-line bg-white text-label hover:bg-[#f5f7fa] disabled:opacity-40"
              >
                <ChevronRightIcon className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); refresh() }}
        />
      )}
      {editUser && (
        <UpdateUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onUpdated={() => { setEditUser(null); refresh() }}
        />
      )}
      {deleteUser && (
        <DeleteUserModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onDeleted={() => { setDeleteUser(null); refresh() }}
        />
      )}
    </>
  )
}
