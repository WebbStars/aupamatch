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

interface State {
  currentPassword: string
  newPassword: string
  showPassword: boolean
}

const ChangePwd: React.FC = () => {
  const [form, setForm] = useState<State>({
    currentPassword: '',
    newPassword: '',
    showPassword: false,
  })

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

  const changePassword = async () => {}

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

        <Button variant="contained" onClick={changePassword}>
          Alterar
        </Button>
      </Box>
    </Paper>
  )
}

export default ChangePwd
