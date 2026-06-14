import type { UserDto } from '@/features/users/types'
import { useDeleteUser } from '@/features/users/hooks/useDeleteUser'
import { TrashIcon } from '@/components/ui/icons'

interface DeleteUserModalProps {
  user: UserDto
  onClose: () => void
  onDeleted: () => void
}

export function DeleteUserModal({ user, onClose, onDeleted }: DeleteUserModalProps) {
  const { submit, isLoading, error } = useDeleteUser(onDeleted)

  async function handleDelete() {
    await submit(user.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgba(8,16,28,0.42)] backdrop-blur-[1.5px]" onClick={onClose} />
      <div className="relative w-[400px] rounded-[18px] bg-white p-[26px] shadow-[0px_12px_32px_-8px_rgba(31,39,51,0.22)]">
        {/* Icon */}
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#fce8e6]">
          <TrashIcon className="size-[26px] text-[#d93025]" />
        </div>

        <h2 className="mb-2 text-center text-[18px] font-bold text-ink">Xoá người dùng?</h2>
        <p className="mb-6 text-center text-[14px] leading-[1.55] text-muted">
          Bạn có chắc muốn xoá{' '}
          <span className="font-bold text-ink">{user.name}</span>{' '}
          khỏi hệ thống? Hành động này không thể hoàn tác.
        </p>

        {error && <p className="mb-3 text-center text-[12.5px] text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-[8px] border border-line text-[14px] font-semibold text-label hover:bg-[#f5f7fa]"
          >
            Huỷ
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex flex-1 h-10 items-center justify-center gap-2 rounded-[8px] bg-[#d93025] text-[14px] font-semibold text-white hover:bg-[#b71c1c] disabled:opacity-60"
          >
            <TrashIcon className="size-[17px]" />
            {isLoading ? 'Đang xoá...' : 'Xoá'}
          </button>
        </div>
      </div>
    </div>
  )
}
