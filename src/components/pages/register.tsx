import { Box } from '@mui/material'
import React from 'react'
import { RegisterPaper } from '../organisms'

import NotLoggedTemplate from '../templates/not_logged'

const Register: React.FC = () => {
  return (
    <NotLoggedTemplate footer={false}>
      <Box
        height={{ xs: 'auto', xl: 'calc(100vh - 100px)' }}
        display="flex"
        alignItems="center"
      >
        <RegisterPaper />
      </Box>
    </NotLoggedTemplate>
  )
}

export default Register
