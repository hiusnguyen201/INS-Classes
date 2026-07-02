import { Avatar } from '@mui/material'

const COLORS = [
  '#1f2733', '#1e8e3e', '#e8710a', '#9334e6', '#d93025',
  '#12a4af', '#c5221f', '#684fa3', '#e52592', '#188038',
]

function getColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return COLORS[Math.abs(hash) % COLORS.length]
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface UserAvatarInitialsProps {
  name: string
  size?: number
}

export function UserAvatarInitials({ name, size = 36 }: UserAvatarInitialsProps) {
  return (
    <Avatar
      sx={{
        bgcolor: getColor(name),
        width: size,
        height: size,
        fontSize: size * 0.38,
        fontWeight: 600,
        letterSpacing: '0.27px',
        borderRadius: '50%',
      }}
    >
      {getInitials(name)}
    </Avatar>
  )
}
