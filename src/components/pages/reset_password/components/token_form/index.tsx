import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import InputToken from '../input_token'
import FormPaper from '../form_paper'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Props {
  handleSubmit: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => Promise<void>
  handleReSendToken: () => Promise<boolean>
  setCode?: (token: string) => void
}

const subtractTimeFromLastRequestID = (
  timeLeft: number,
  oldRequestIDTime?: number
) => {
  if (!oldRequestIDTime) return timeLeft

  const timeElapsed = Math.floor((Date.now() - oldRequestIDTime) / 1000)

  return timeLeft - timeElapsed
}

const classes = {
  resendButton: {
    color: 'secondary',
    width: 'auto',
  },
}

const TokenForm: React.FC<Props> = ({
  handleSubmit,
  handleReSendToken,
  setCode,
}) => {
  const [isLoadingContinueButton, setIsLoadingContinueButton] = useState(false)
  const [isLoadingResend, setIsLoadingResend] = useState(false)
  const [counter, setCounter] = useState(subtractTimeFromLastRequestID(30))

  const disableResendButton = counter !== 0

  const [token, setToken] = useState('')

  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleClose = () => {
    navigate('/verify_email')
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (counter > 0) {
        setCounter((oldCounter) => oldCounter - 1)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  })

  useEffect(() => {
    setCode?.(token)
  }, [token])

  const handleButtonSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsLoadingContinueButton(true)
    await handleSubmit(event)
    setIsLoadingContinueButton(false)
  }

  const handleReSendTokenSubmit = async () => {
    setIsLoadingResend(true)
    const success = await handleReSendToken()
    setIsLoadingResend(false)
    if (success) setCounter(30)
  }

  const customButton = () => {
    return (
      <Button
        sx={classes.resendButton}
        variant="outlined"
        onClick={handleReSendTokenSubmit}
        disabled={disableResendButton}
      >
        {(disableResendButton || isLoadingResend) && (
          <CircularProgress size="14px" />
        )}
        {disableResendButton
          ? t('pages.reset_password.components.token_form.resend_disabled', {
              counter,
            })
          : t('pages.reset_password.components.token_form.resend_token', {
              counter,
            })}
      </Button>
    )
  }

  return (
    <FormPaper
      title={t('pages.reset_password.components.token_form.title')}
      subtitle={t('pages.reset_password.components.token_form.subtitle')!}
      handleSubmit={handleButtonSubmit}
      isLoading={isLoadingContinueButton}
      handleClose={handleClose}
      customButton={customButton()}
    >
      <Box>
        <InputToken setToken={setToken} />
      </Box>
    </FormPaper>
  )
}

export default TokenForm
