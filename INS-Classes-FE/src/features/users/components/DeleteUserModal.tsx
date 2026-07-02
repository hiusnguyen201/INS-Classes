import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
} from '@mui/material'
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

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: '18px', width: 400, maxWidth: '100%' } } }}
    >
      <DialogContent sx={{ px: 3.5, pt: 3.5, pb: 0, textAlign: 'center' }}>
        <Box
          sx={{
            mx: 'auto',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: '#fce8e6',
          }}
        >
          <TrashIcon className="size-[26px]" style={{ color: '#d93025' }} />
        </Box>

        <Typography sx={{ mb: 1, fontSize: 18, fontWeight: 700, color: '#0f1b33' }}>
          Xoá người dùng?
        </Typography>
        <Typography sx={{ mb: 3, fontSize: 14, lineHeight: 1.55, color: '#6b7686' }}>
          Bạn có chắc muốn xoá{' '}
          <Typography component="span" sx={{ fontWeight: 700, color: '#0f1b33' }}>
            {user.name}
          </Typography>{' '}
          khỏi hệ thống? Hành động này không thể hoàn tác.
        </Typography>

        {error && (
          <Typography sx={{ mb: 2, fontSize: 12.5, color: 'error.main' }}>{error}</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3.5, pb: 3.5, pt: 0, gap: 1.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{ height: 40, borderRadius: '8px', fontSize: 14, fontWeight: 600, borderColor: '#e3e7ee', color: '#44505f', textTransform: 'none' }}
        >
          Huỷ
        </Button>
        <Button
          onClick={() => submit(user.id)}
          variant="contained"
          color="error"
          disabled={isLoading}
          fullWidth
          startIcon={<TrashIcon className="size-4.25" />}
          sx={{ height: 40, borderRadius: '8px', fontSize: 14, fontWeight: 600, textTransform: 'none' }}
        >
          {isLoading ? 'Đang xoá...' : 'Xoá'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
