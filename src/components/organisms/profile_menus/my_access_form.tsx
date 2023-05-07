import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from '../../../store'

interface State {
  currentPassword: string
  newPassword: string
  showPassword: boolean
}

const MyAccessForm: React.FC = () => {
  const [changePwd, setChangePwd] = useState(false)
  const [form, setForm] = useState<State>({
    currentPassword: '',
    newPassword: '',
    showPassword: false,
  })
  const profile = useSelector((state) => state.userProfile)

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      gap={4}
      justifySelf="center"
    >
      <Paper sx={{ width: 704, maxWidth: '100%', padding: '20px 28px' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold">
            Meu acesso
          </Typography>
          <Link underline="none">Excluir minha conta</Link>
        </Box>

        <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box component="div">
            <InputLabel>E-mail de cadastro</InputLabel>
            <FormControl fullWidth>
              <TextField defaultValue={profile && profile.email} />
            </FormControl>
          </Box>

          <Box component="div">
            <InputLabel>Senha</InputLabel>
            <FormControl fullWidth>
              <OutlinedInput
                value="************"
                disabled
                type="password"
                autoComplete="new-password"
                endAdornment={
                  <InputAdornment position="end">
                    <Typography
                      sx={{ cursor: 'pointer' }}
                      color="primary"
                      onClick={() => setChangePwd(!changePwd)}
                    >
                      Alterar
                    </Typography>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
      </Paper>

      {changePwd && (
        <Paper sx={{ width: 704, maxWidth: '100%', padding: '20px 28px' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" fontWeight="bold">
              Alterar senha
            </Typography>
          </Box>

          <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box component="div">
              <InputLabel>Senha atual</InputLabel>
              <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
                <OutlinedInput
                  autoComplete="new-password"
                  id="current-password-input"
                  type="password"
                  value={form.currentPassword}
                  onChange={handleChange('currentPassword')}
                  placeholder="Insira sua senha"
                  required
                />
              </FormControl>
            </Box>

            <Box component="div">
              <InputLabel>Senha nova</InputLabel>
              <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
                <OutlinedInput
                  autoComplete="new-password"
                  id="new-password-input"
                  type={form.showPassword ? 'text' : 'password'}
                  value={form.newPassword}
                  onChange={handleChange('newPassword')}
                  placeholder="Insira sua senha"
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {form.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  )
}

export default MyAccessForm
