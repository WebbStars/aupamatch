import React, { useState } from 'react'
import { Box } from '@mui/material'
import classes from './styles'
import TokenForm from '../../components/token_form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { validateToken } from '../../services/validate_token'
import { verifyEmail } from '../../services/verify_email'
import { useDispatch } from '../../../../../store'
import {
  setErrorMessage,
  setSuccessMessage,
} from '../../../../../store/notifications'

const SendToken: React.FC = () => {
  const [code, setCode] = useState('')

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const userEmail = (location.state?.email as string) || ''

  const isDataValid = () => {
    return !!userEmail
  }

  const handleSubmit = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!isDataValid) return

    const { hasError } = await validateToken(userEmail, code)

    if (hasError) {
      dispatch(
        setErrorMessage(
          t('pages.reset_password.pages.send_token.invalid_token')!
        )
      )
      return
    }

    navigate(`/change_password?token=${code}`, { state: { userEmail } })
  }

  const handleResendToken = async () => {
    if (!isDataValid()) {
      navigate('/verify_email')
      return false
    }

    const { hasError, error } = await verifyEmail(userEmail)

    if (hasError) {
      if (error == 'MissingAuthenticatorsError') {
        dispatch(setErrorMessage(t('pages.reset_password.error')!))
        navigate('/login')
      }
      return false
    }

    dispatch(
      setSuccessMessage(
        t('pages.reset_password.pages.send_token.success_sent')!
      )
    )
    return true
  }

  return (
    <Box sx={classes.root}>
      <TokenForm
        setCode={setCode}
        handleSubmit={handleSubmit}
        handleReSendToken={handleResendToken}
      />
    </Box>
  )
}

export default SendToken
