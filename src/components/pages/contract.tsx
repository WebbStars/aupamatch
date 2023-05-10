import { Box, Button, Checkbox, Paper, Typography } from '@mui/material'
import React from 'react'

const classes = {
  main: {
    display: 'grid',
    justifyItems: 'center',
    height: '80vh',
    width: '100%',
  },
}

const NeedContract: React.FC = () => {
  return (
    <Box sx={classes.main} padding={{ lg: '36px 40px' }}>
      <Paper
        sx={{
          padding: '42px 80px',
          maxWidth: '600px',
          width: 'auto',
          height: '210px',
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography fontSize="22px" fontWeight="bold">
          Deseja habilitar esse serviço?
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Checkbox />
          <Typography>Candidatura em +5 vagas por mês - $5.00</Typography>
        </Box>

        <Button variant="contained">Continuar</Button>
      </Paper>
    </Box>
  )
}

export default NeedContract
