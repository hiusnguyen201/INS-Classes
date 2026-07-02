import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { UserType, type UserDto } from '@/features/users/types'
import { useUpdateUser } from '@/features/users/hooks/useUpdateUser'
import { XIcon, EditIcon, UsersIcon, UserIcon, ShieldUserIcon, CheckIcon } from '@/components/ui/icons'

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
    <Dialog
      open
      onClose={onClose}
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: '18px', width: 480, maxWidth: '100%' } } }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '10px', bgcolor: '#e7eefe', flexShrink: 0 }}>
          <EditIcon className="size-5" style={{ color: '#2563eb' }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 16.5, color: '#0f1b33' }}>Sửa người dùng</Typography>
          <Typography sx={{ fontSize: 12.5, color: '#6b7686' }}>Cập nhật thông tin tài khoản</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ ml: 'auto', color: '#9aa4b2' }} size="small">
          <XIcon className="size-[19px]" />
        </IconButton>
      </Box>

      {/* Form */}
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ px: 3, pt: 3, pb: 0 }}>
          <TextField
            label="Họ và tên"
            fullWidth
            size="small"
            placeholder="Nguyễn Văn A"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ mb: 2.75 }}
          />

          <TextField
            label="Email"
            fullWidth
            size="small"
            value={user.email}
            disabled
            sx={{ mb: 2.75 }}
          />

          {/* Type selector */}
          <Typography sx={{ mb: 1, fontSize: 13, fontWeight: 600, color: '#44505f' }}>
            Loại tài khoản
          </Typography>
          <ToggleButtonGroup
            exclusive
            fullWidth
            value={formik.values.type}
            onChange={(_, v) => v && formik.setFieldValue('type', v)}
            sx={{ mb: 2.75 }}
          >
            {TYPE_OPTIONS.map(({ value, label, icon }) => (
              <ToggleButton
                key={value}
                value={value}
                sx={{
                  flexDirection: 'column',
                  gap: 0.5,
                  py: 1.5,
                  fontSize: 13,
                  fontWeight: 600,
                  borderColor: '#e3e7ee',
                  textTransform: 'none',
                  color: '#6b7686',
                  '&.Mui-selected': {
                    borderColor: 'primary.main',
                    bgcolor: '#f3f7ff',
                    color: 'primary.main',
                  },
                }}
              >
                {icon}
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {error && (
            <Typography sx={{ mb: 1.5, fontSize: 12.5, color: 'error.main' }}>{error}</Typography>
          )}
        </DialogContent>

        <Divider />
        <DialogActions sx={{ bgcolor: '#f5f7fa', px: 3, py: 2, gap: 1.5 }}>
          <Button
            type="button"
            onClick={onClose}
            variant="outlined"
            sx={{ height: 40, borderRadius: '8px', fontSize: 14, fontWeight: 600, borderColor: '#e3e7ee', color: '#44505f', textTransform: 'none' }}
          >
            Huỷ
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={<CheckIcon className="size-4.25" />}
            sx={{ height: 40, borderRadius: '8px', fontSize: 14, fontWeight: 600, textTransform: 'none' }}
          >
            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
