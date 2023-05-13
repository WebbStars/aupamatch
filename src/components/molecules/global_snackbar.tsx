import React, { useEffect, useState } from 'react'
import { Snackbar, Alert, AlertProps, Typography } from '@mui/material'
import { useSelector, useDispatch } from '../../store'
import { clearMessages, setErrorMessage } from '../../store/notifications'
import { useTranslation } from 'react-i18next'

const SnackAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    return (
      <Alert
        id="alert-snack-bar"
        elevation={6}
        ref={ref}
        variant="filled"
        {...props}
      />
    )
  }
)

type Status = 'info' | 'success' | 'warning' | 'error' | undefined

const SnackbarNotification: React.FC = () => {
  const vertical = 'top'
  const horizontal = 'right'

  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [message, setMessage] = useState<string | string[]>()
  const [status, setStatus] = useState<Status>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (notification?.message) {
      setOpen(true)
      setMessage(notification.message)
      setStatus(notification.status)
    }
  }, [notification])

  const noResponse = () => {
    dispatch(setErrorMessage(t('molecules.global_snackbar.no_response')!))
  }

  useEffect(() => {
    window.addEventListener('no_response', noResponse)
    return () => window.removeEventListener('no_response', noResponse)
  }, [])

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return
    setOpen(false)
    dispatch(clearMessages())
  }

  const showedMessages = () => {
    if (Array.isArray(message)) {
      return message.map((each, index) => (
        <Typography key={`global-snackbar-${index}`}>{each}</Typography>
      ))
    }
    return message
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={7000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <SnackAlert onClose={handleClose} severity={status} color="error">
        {showedMessages()}
      </SnackAlert>
    </Snackbar>
  )
}

export default SnackbarNotification
