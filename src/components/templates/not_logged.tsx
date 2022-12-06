import React from 'react'
import { Box } from '@mui/material'
import { Footer, Header } from '../organisms'

interface Props {
  children: React.ReactNode
  footer?: boolean
}

const NotLoggedTemplate: React.FC<Props> = ({ children, footer = true }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <Header />
      {children}
      {footer && <Footer />}
    </Box>
  )
}

export default NotLoggedTemplate
