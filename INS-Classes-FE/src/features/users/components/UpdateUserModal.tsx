import { useFormik } from 'formik'
import * as Yup from 'yup'
import { UserType, type UserDto } from '@/features/users/types'
import { useUpdateUser } from '@/features/users/hooks/useUpdateUser'
import { TextField } from '@/components/ui/TextField'
import { XIcon, UsersIcon, UserIcon, ShieldUserIcon, EditIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'

const TYPE_OPTIONS: { value: UserType; label: string; icon: React.ReactNode }[] = [
  { value: UserType.USER, label: 'Học viên', icon: <UserIcon className="size-5" /> },
  { value: UserType.TEACHER, label: 'Giảng viên', icon: <UsersIcon className="size-5" /> },
  { value: UserType.ADMIN, label: 'Quản trị', icon: <ShieldUserIcon className="size-5" /> },
]

const schema = Yup.object({
  name: Yup.string().required('Vui lòng nhập họ và tên'),
  type: Yup.mixed<UserType>().oneOf(Object.values(UserType)).required(),
})

interface UpdateUserModalProps {
  user: UserDto
  onClose: () => void
  onUpdated: () => void
}

export function UpdateUserModal({ user, onClose, onUpdated }: UpdateUserModalProps) {
  const { submit, isLoading, error } = useUpdateUser(onUpdated)

  const formik = useFormik({
    initialValues: { name: user.name, type: user.type },
    validationSchema: schema,
    onSubmit: async (values) => {
      await submit(user.id, values)
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgba(8,16,28,0.42)] backdrop-blur-[1.5px]" onClick={onClose} />
      <div className="relative w-[480px] overflow-hidden rounded-[18px] bg-white shadow-[0px_12px_32px_-8px_rgba(31,39,51,0.22)]">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-line px-[22px] py-5">
          <div className="flex size-[38px] items-center justify-center rounded-[10px] bg-ring-soft">
            <EditIcon className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-[16.5px] font-bold text-ink">Sửa người dùng</p>
            <p className="text-[12.5px] text-muted">Cập nhật thông tin tài khoản</p>
          </div>
          <button onClick={onClose} className="ml-auto text-faint hover:text-label">
            <XIcon className="size-[19px]" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={formik.handleSubmit} className="px-[22px] pt-[22px]">
          <TextField
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            {...formik.getFieldProps('name')}
            error={formik.touched.name ? formik.errors.name : undefined}
            className="mb-[22px]"
          />

          {/* Email readonly */}
          <div className="mb-[22px]">
            <label className="mb-[7px] block text-[13px] font-semibold text-label">Email</label>
            <div className="flex h-12 items-center rounded-[11px] border border-edge bg-[#f5f7fa] px-3.5">
              <span className="text-[14.5px] text-muted">{user.email}</span>
            </div>
          </div>

          {/* Type selector */}
          <p className="mb-2 text-[13px] font-semibold text-label">Loại tài khoản</p>
          <div className="mb-[22px] grid grid-cols-3 gap-3">
            {TYPE_OPTIONS.map(({ value, label, icon }) => {
              const selected = formik.values.type === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => formik.setFieldValue('type', value)}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-[11px] border py-3 transition-colors',
                    selected
                      ? 'border-primary bg-[#f3f7ff] text-primary'
                      : 'border-line bg-white text-muted hover:border-edge',
                  )}
                >
                  {icon}
                  <span className="text-[13px] font-semibold">{label}</span>
                </button>
              )
            })}
          </div>

          {error && <p className="mb-3 text-[12.5px] text-red-600">{error}</p>}

          {/* Footer */}
          <div className="-mx-[22px] flex items-center justify-end gap-3 border-t border-line bg-[#f5f7fa] px-[22px] py-4">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-[8px] border border-line px-5 text-[14px] font-semibold text-label hover:bg-white"
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-10 items-center gap-2 rounded-[8px] bg-primary px-5 text-[14px] font-semibold text-white shadow-[0px_2px_8px_-2px_#2563eb] hover:bg-primary-dark disabled:opacity-60"
            >
              <CheckIcon className="size-[17px]" />
              {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
