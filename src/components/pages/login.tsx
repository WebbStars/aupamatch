import { Box } from '@mui/material'
import React from 'react'
import { LoginPaper } from '../organisms'

import NotLoggedTemplate from '../templates/not_logged'

const Login: React.FC = () => {
  return (
    <NotLoggedTemplate footer={false}>
      <Box
        display="flex"
        alignItems="center"
        height={{ xs: 'auto', xl: 'calc(100vh - 100px)' }}
      >
        <LoginPaper />
      </Box>
    </NotLoggedTemplate>
  )
}

export default Login
