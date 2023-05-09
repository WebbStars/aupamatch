import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from '../../../store'

interface Props {
  setMenu: Dispatch<SetStateAction<string>>
}

const MyAccessForm: React.FC<Props> = ({ setMenu }) => {
  const profile = useSelector((state) => state.userProfile)

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
                    onClick={() => setMenu('changePwd')}
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
  )
}

export default MyAccessForm
