import { type ReactNode, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  ButtonBase,
  Menu,
  MenuItem,
} from '@mui/material'
import { UserAvatarInitials } from '@/components/ui/UserAvatarInitials'
import { PATHS } from '@/config/paths'
import {
  LayoutDashboardIcon,
  UsersIcon,
  ChevronDownIcon,
  LogOutIcon,
} from '@/components/ui/icons'
import { useAuth } from '@/features/auth/hooks/useAuth'

const DRAWER_WIDTH = 230

const NAV_ITEMS = [
  { label: 'Tổng quan', icon: <LayoutDashboardIcon className="size-[19px]" />, path: PATHS.adminDashboard },
  { label: 'Người dùng', icon: <UsersIcon className="size-[19px]" />, path: PATHS.adminUsers },
]

const TYPE_LABEL: Record<string, string> = {
  ADMIN: 'Admin',
  TEACHER: 'Giảng viên',
  USER: 'Học viên',
}

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, clearSession } = useAuth()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  function handleLogout() {
    clearSession()
    navigate(PATHS.login)
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7f9fc' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            position: 'absolute',
            left: 24,
            top: 32,
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#9aa4b2',
          }}
        >
          Quản trị hệ thống
        </Typography>

        <List sx={{ mt: 6.5, px: 1.5 }}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.path
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={active}
                  sx={{
                    borderRadius: '9px',
                    height: 41,
                    position: 'relative',
                    color: active ? 'primary.main' : '#44505f',
                    '&.Mui-selected': {
                      bgcolor: '#e7eefe',
                      '&:hover': { bgcolor: '#e7eefe' },
                    },
                    '&:hover': { bgcolor: '#f5f7fa' },
                  }}
                >
                  {active && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: -12,
                        top: 8,
                        bottom: 8,
                        width: 3,
                        bgcolor: 'primary.main',
                        borderRadius: 999,
                      }}
                    />
                  )}
                  <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{ primary: { sx: { fontSize: 14, fontWeight: 600 } } }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>

      {/* Right column */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        {/* Header */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            zIndex: (t) => t.zIndex.drawer - 1,
          }}
        >
          <Toolbar sx={{ height: 60, minHeight: '60px !important', px: 2, gap: 2 }}>
            {/* Logo */}
            <Link to={PATHS.home} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                  flexShrink: 0,
                }}
              >
                <svg style={{ width: 20, height: 20, color: 'white' }} viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Box>
              <Typography sx={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px', color: '#0f1b33', lineHeight: 1 }}>
                INS{' '}
                <Typography component="span" sx={{ fontWeight: 500, color: '#6b7686', fontSize: 18 }}>
                  Classes
                </Typography>
              </Typography>
            </Link>

            {/* Global search */}
            {/* <Paper
              elevation={0}
              sx={{
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                borderRadius: 99,
                bgcolor: '#f5f7fa',
                width: 400,
                px: 2,
                py: 1,
              }}
            >
              <SearchIcon className="size-[18px]" style={{ color: '#9aa4b2', flexShrink: 0 }} />
              <Typography sx={{ fontSize: 14, color: '#757575' }}>
                Tìm lớp học, học viên, bài tập...
              </Typography>
            </Paper> */}

            {/* Right actions */}
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {/* Bell */}
              {/* <ButtonBase
                sx={{ width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { bgcolor: '#f5f7fa' } }}
              >
                <Badge
                  variant="dot"
                  color="error"
                  sx={{ '& .MuiBadge-dot': { width: 7, height: 7 } }}
                >
                  <BellIcon className="size-[21px]" style={{ color: '#44505f' }} />
                </Badge>
              </ButtonBase> */}

              {/* User dropdown trigger */}
              <ButtonBase
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  borderRadius: 99,
                  border: '1px solid',
                  borderColor: 'divider',
                  pl: 0.75,
                  pr: 1.5,
                  py: 0.75,
                  '&:hover': { bgcolor: '#f5f7fa' },
                }}
              >
                <UserAvatarInitials name={user?.name ?? 'Admin'} size={32} />
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#0f1b33', lineHeight: 1.3 }}>
                    {user?.name ?? 'Quản trị viên'}
                  </Typography>
                  <Typography sx={{ fontSize: 10.5, color: '#6b7686', lineHeight: 1.3 }}>
                    {TYPE_LABEL[user?.type ?? ''] ?? 'Người dùng'}
                  </Typography>
                </Box>
                <ChevronDownIcon
                  className="size-[15px]"
                  style={{
                    color: '#6b7686',
                    transform: anchorEl ? 'rotate(180deg)' : undefined,
                    transition: 'transform 0.2s',
                  }}
                />
              </ButtonBase>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                  paper: {
                    elevation: 2,
                    sx: { borderRadius: '12px', border: '1px solid', borderColor: 'divider', mt: 0.75, width: 160 },
                  },
                }}
              >
                <MenuItem onClick={handleLogout} sx={{ fontSize: 13.5, color: 'error.main', gap: 1.25 }}>
                  <LogOutIcon className="size-4" />
                  Đăng xuất
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box component="main" sx={{ flex: 1, px: 4, py: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
