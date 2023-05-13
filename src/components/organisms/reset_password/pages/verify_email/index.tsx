import React from 'react'
import { Box } from '@mui/material'
import classes from './styles'
import VerifyEmailForm from '../../components/verify_email_form'

const VerifyUserEmail: React.FC = () => {
  return (
    <Box sx={classes.root}>
      <VerifyEmailForm />
    </Box>
  )
}

export default VerifyUserEmail
