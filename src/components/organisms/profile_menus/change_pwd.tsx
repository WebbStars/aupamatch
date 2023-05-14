import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { updateUserProfileService } from '../../../services'
import { useDispatch } from '../../../store'
import {
  setErrorMessage,
  setSuccessMessage,
} from '../../../store/notifications'

interface State {
  currentPassword: string
  newPassword: string
}

const initialFormState = {
  currentPassword: '',
  newPassword: '',
}

const ChangePwd: React.FC = () => {
  const [form, setForm] = useState<State>(initialFormState)
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const accessToken = sessionStorage.getItem('accessToken')

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const changePassword = async () => {
    const payload = {
      currentPassword: form.currentPassword,
      password: form.newPassword,
    }

    const { hasError } = await updateUserProfileService(accessToken!, payload)

    if (hasError) {
      dispatch(setErrorMessage('Erro ao tentar mudar sua senha'))
      return
    }
    dispatch(setSuccessMessage('Senha atualizada com sucesso'))
    setForm(initialFormState)
  }

  return (
    <Paper
      sx={{
        width: 704,
        maxWidth: '100%',
        height: 'fit-content',
        padding: '20px 28px',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          {t('organisms.profile_menu.change_password')}
        </Typography>
      </Box>

      <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box component="div">
          <InputLabel>{t('organisms.profile_menu.current_password')}</InputLabel>
          <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
            <OutlinedInput
              autoComplete="new-password"
              id="current-password-input"
              type="password"
              value={form.currentPassword}
              onChange={handleChange('currentPassword')}
              placeholder={t('organisms.profile_menu.enter_your_current_password')!}
              required
            />
          </FormControl>
        </Box>

        <Box component="div">
          <InputLabel>{t('organisms.profile_menu.new_password')}</InputLabel>
          <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
            <OutlinedInput
              autoComplete="new-password"
              id="new-password-input"
              type={showPassword ? 'text' : 'password'}
              value={form.newPassword}
              onChange={handleChange('newPassword')}
              placeholder={t('organisms.profile_menu.enter_your_new_password')!}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Button variant="contained" onClick={changePassword}>
        {t('organisms.profile_menu.change')}
        </Button>
      </Box>
    </Paper>
  )
}

export default ChangePwd
