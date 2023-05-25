import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import LoggedTemplate from '../templates/logged'

const classes = {
  main: {
    display: 'grid',
    justifyItems: 'center',
    height: '80vh',
    width: '100%',
  },
}

interface Props {
  family?: boolean
  agency?: boolean
  handleSubmit: () => void
  detail?: string
  isLoading?: boolean
  isPaying?: boolean
}

const NeedContract: React.FC<Props> = ({
  family = false,
  agency = false,
  handleSubmit,
  detail,
  isLoading,
  isPaying = false,
}) => {
  const [checked, setChecked] = useState(false)

  return (
    <LoggedTemplate family={family} agency={agency}>
      <Box sx={classes.main} padding={{ lg: '36px 40px' }}>
        <Paper
          sx={{
            padding: '42px 80px',
            maxWidth: '600px',
            width: 'auto',
            height: 'auto',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {isPaying ? (
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              gap={2}
              textAlign="center"
            >
              <CircularProgress size="64px" color="primary" />
              <Typography variant="h4" color="primary">
                Registrando Pagamento...
              </Typography>
              <Typography variant="h6">
                recarregue a página caso já o tenha realizado
              </Typography>
            </Box>
          ) : (
            <>
              <Typography fontSize="22px" fontWeight="bold">
                Deseja habilitar esse serviço?
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Checkbox
                  value={checked}
                  onChange={() => setChecked(!checked)}
                />
                <Typography>
                  {detail || 'Candidatura em +5 vagas por mês - $5.00'}
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!checked}
              >
                {isLoading ? (
                  <CircularProgress
                    size="22px"
                    sx={{ color: 'secondary.light' }}
                  />
                ) : (
                  'Continuar'
                )}
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </LoggedTemplate>
  )
}

export default NeedContract
