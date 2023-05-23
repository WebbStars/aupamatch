import React from 'react'
import { Box } from '@mui/material'
import { Footer, LoggedHeader } from '../organisms'

interface Props {
  children: React.ReactNode
  family?: boolean
  agency?: boolean
  footer?: boolean
  hideLinks?: boolean
}

const LoggedTemplate: React.FC<Props> = ({
  children,
  family = false,
  agency = false,
  footer = false,
  hideLinks = false,
}) => {
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100vh">
      <LoggedHeader family={family} agency={agency} hideLinks={hideLinks} />
      {children}
      {footer && <Footer family />}
    </Box>
  )
}

export default LoggedTemplate
