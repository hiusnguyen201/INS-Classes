import { UserType } from '@/features/users/types'

const CONFIG: Record<UserType, { label: string; bg: string; color: string }> = {
  [UserType.ADMIN]: { label: 'Admin', bg: '#e7eefe', color: '#1d4ed8' },
  [UserType.TEACHER]: { label: 'Giảng viên', bg: '#f4e8fd', color: '#7c46f0' },
  [UserType.USER]: { label: 'Học viên', bg: '#e8f0fe', color: '#0a85bd' },
}

interface UserTypeBadgeProps {
  type: UserType
}

export function UserTypeBadge({ type }: UserTypeBadgeProps) {
  const { label, bg, color } = CONFIG[type] ?? CONFIG[UserType.USER]
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold leading-[15px]"
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  )
}
