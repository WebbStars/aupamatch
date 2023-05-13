import React from 'react'
import { Box } from '@mui/material'
import classes from './styles'
import ChangePasswordForm from '../../components/change_password_form'

const ChangePassword: React.FC = () => {
  return (
    <Box sx={classes.root}>
      <ChangePasswordForm />
    </Box>
  )
}

export default ChangePassword
