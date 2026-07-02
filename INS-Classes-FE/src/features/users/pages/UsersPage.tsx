import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material'
import { UserType, type UserDto } from '@/features/users/types'
import { useUsers, PAGE_SIZE_OPTIONS } from '@/features/users/hooks/useUsers'
import { UserAvatarInitials } from '@/components/ui/UserAvatarInitials'
import { UserTypeBadge } from '@/features/users/components/UserTypeBadge'
import { CreateUserModal } from '@/features/users/components/CreateUserModal'
import { UpdateUserModal } from '@/features/users/components/UpdateUserModal'
import { DeleteUserModal } from '@/features/users/components/DeleteUserModal'
import { PlusIcon, UploadIcon, DownloadIcon, SearchIcon, EditIcon, TrashIcon } from '@/components/ui/icons'
import { useAuth } from '@/features/auth/hooks/useAuth'

const TAB_FILTERS: { label: string; value: UserType | undefined }[] = [
  { label: 'Tất cả', value: undefined },
  { label: 'Admin', value: UserType.ADMIN },
  { label: 'Giảng viên', value: UserType.TEACHER },
  { label: 'Học viên', value: UserType.USER },
]

const HEAD_CELL_SX = {
  fontWeight: 700,
  fontSize: 11.5,
  letterSpacing: '0.46px',
  textTransform: 'uppercase' as const,
  color: '#6b7686',
  py: 1.5,
}

export function UsersPage() {
  const {
    users,
    metadata,
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
    refresh,
  } = useUsers()

  const { user: currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false)
  const [editUser, setEditUser] = useState<UserDto | null>(null)
  const [deleteUser, setDeleteUser] = useState<UserDto | null>(null)

  const totalCount = metadata?.totalCount ?? 0
  const totalPages = metadata?.totalPages ?? 1
  const activeTabIndex = TAB_FILTERS.findIndex((f) => f.value === typeFilter)

  return (
    <>
      {/* Page header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: 23, fontWeight: 700, letterSpacing: '-0.46px', color: '#0f1b33' }}>
            Người dùng
          </Typography>
          <Typography sx={{ mt: 0.5, fontSize: 14, color: '#6b7686' }}>
            {totalCount > 0 ? `${totalCount} tài khoản trong hệ thống` : 'Đang tải...'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            disabled
            startIcon={<UploadIcon className="size-4.25" />}
            sx={{ height: 40, borderRadius: '8px', fontSize: 14, fontWeight: 600, borderColor: '#d3d9e2', color: '#0f1b33', textTransform: 'none' }}
          >
            Nhập Excel
          </Button>
          <Button
            variant="outlined"
            disabled
            startIcon={<DownloadIcon className="size-4.25" />}
            sx={{ height: 40, borderRadius: '8px', fontSize: 14, fontWeight: 600, borderColor: '#d3d9e2', color: '#0f1b33', textTransform: 'none' }}
          >
            Xuất Excel
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowCreate(true)}
            startIcon={<PlusIcon className="size-4.25" />}
            sx={{ height: 40, borderRadius: '8px', fontSize: 14, fontWeight: 600, textTransform: 'none' }}
          >
            Thêm người dùng
          </Button>
        </Box>
      </Box>

      {/* Filters + Search row */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        {/* Tab filters */}
        <Paper
          elevation={0}
          sx={{ borderRadius: '10px', border: '1px solid', borderColor: 'divider', p: 0.5 }}
        >
          <Tabs
            value={activeTabIndex === -1 ? 0 : activeTabIndex}
            onChange={(_, i) => changeTypeFilter(TAB_FILTERS[i].value)}
            sx={{
              minHeight: 'unset',
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTab-root': {
                minHeight: 'unset',
                py: 0.75,
                px: 2,
                fontSize: 13.5,
                fontWeight: 600,
                borderRadius: '7px',
                textTransform: 'none',
                color: '#6b7686',
                minWidth: 'unset',
              },
              '& .Mui-selected': {
                bgcolor: '#e7eefe',
                color: 'primary.main !important',
              },
            }}
          >
            {TAB_FILTERS.map(({ label }) => (
              <Tab key={label} label={label} disableRipple />
            ))}
          </Tabs>
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Page size */}
          <Select
            size="small"
            value={size}
            onChange={(e) => changeSize(Number(e.target.value))}
            sx={{ fontSize: 13.5, fontWeight: 600, minWidth: 110 }}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <MenuItem key={n} value={n} sx={{ fontSize: 13.5 }}>
                {n} / trang
              </MenuItem>
            ))}
          </Select>

          {/* Search */}
          <TextField
            size="small"
            value={keyword}
            onChange={(e) => changeKeyword(e.target.value)}
            placeholder="Tìm tên, email..."
            sx={{ width: 256 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="size-4.25" style={{ color: '#9aa4b2' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>

      {/* Table card */}
      <Paper
        elevation={0}
        sx={{ borderRadius: '14px', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...HEAD_CELL_SX, width: '38%' }}>Người dùng</TableCell>
                <TableCell sx={{ ...HEAD_CELL_SX, width: '30%' }}>Email</TableCell>
                <TableCell sx={{ ...HEAD_CELL_SX, width: '16%' }}>Loại</TableCell>
                <TableCell align="right" sx={HEAD_CELL_SX}>Thao tác</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              )}
              {error && !isLoading && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8, color: 'error.main', fontSize: 14 }}>
                    {error}
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !error && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8, fontSize: 14, color: '#6b7686' }}>
                    Không có người dùng nào.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                users.map((user) => (
                  <TableRow key={user.id} sx={{ '&:last-child td': { border: 0 } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <UserAvatarInitials name={user.name} />
                        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#0f1b33' }}>
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, color: '#44505f' }}>{user.email}</TableCell>
                    <TableCell>
                      <UserTypeBadge type={user.type} />
                    </TableCell>
                    <TableCell align="right">
                      {user.id !== currentUser?.id && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                          <Tooltip title="Sửa">
                            <IconButton
                              size="small"
                              onClick={() => setEditUser(user)}
                              sx={{ color: '#9aa4b2', '&:hover': { color: 'primary.main' } }}
                            >
                              <EditIcon className="size-5" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xoá">
                            <IconButton
                              size="small"
                              onClick={() => setDeleteUser(user)}
                              sx={{ color: '#9aa4b2', '&:hover': { color: 'error.main' } }}
                            >
                              <TrashIcon className="size-5" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination footer */}
        {!isLoading && users.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: '#f5f7fa',
              px: 2.5,
              py: 2,
            }}
          >
            <Typography sx={{ fontSize: 13, color: '#6b7686' }}>
              Hiển thị {(page - 1) * size + 1}–{Math.min(page * size, totalCount)} trong {totalCount} kết quả
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, p) => setPage(p)}
              size="small"
              color="primary"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: 13.5,
                },
              }}
            />
          </Box>
        )}
      </Paper>

      {/* Modals */}
      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false)
            refresh()
          }}
        />
      )}
      {editUser && (
        <UpdateUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onUpdated={() => {
            setEditUser(null)
            refresh()
          }}
        />
      )}
      {deleteUser && (
        <DeleteUserModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onDeleted={() => {
            setDeleteUser(null)
            refresh()
          }}
        />
      )}
    </>
  )
}
