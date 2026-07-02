import { Chip } from '@mui/material'
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
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: bg,
        color,
        fontWeight: 600,
        fontSize: 12,
        height: 22,
        borderRadius: 99,
        '& .MuiChip-label': { px: 1.25 },
      }}
    />
  )
}
