import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  handleChangeInput: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  id?: string
  label?: string
  name?: string
  error?: boolean
  helperText?: string
}

const PasswordInput: React.FC<Props> = ({
  handleChangeInput,
  id,
  label,
  name,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
      <InputLabel htmlFor="password-input">
        {t('organisms.login_paper.password')}
      </InputLabel>
      <TextField
        id={id || 'password-input'}
        type={showPassword ? 'text' : 'password'}
        name={name || 'password'}
        onChange={handleChangeInput}
        error={error}
        helperText={helperText}
        required
        InputProps={{
          endAdornment: (
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
          ),
        }}
        label={label || t('organisms.login_paper.password')}
      />
    </FormControl>
  )
}

export default PasswordInput
