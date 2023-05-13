import React, { useState } from 'react'
import { Grid, FormControl, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import classes from './styles'
import { useNavigate } from 'react-router-dom'
import FormPaper from '../form_paper'
import { verifyEmail } from '../../services/verify_email'
import { useDispatch } from '../../../../../store'
import { setErrorMessage } from '../../../../../store/notifications'

const VerifyEmailForm: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setIsLoading(true)
    const { hasError, error } = await verifyEmail(userEmail)
    setIsLoading(false)

    if (hasError) {
      if (error == 'MissingAuthenticatorsError') {
        dispatch(setErrorMessage(t('pages.reset_password.error')!))
        navigate('/login')
        return
      }
      dispatch(
        setErrorMessage(
          t('pages.reset_password.components.verify_email_form.server_error')!
        )
      )
      return
    }

    navigate('/send_token', { state: { email: userEmail } })
  }

  const handleClose = () => {
    navigate({
      pathname: '/login',
    })
  }

  return (
    <FormPaper
      title={t('pages.reset_password.components.verify_email_form.title')}
      subtitle={
        t('pages.reset_password.components.verify_email_form.subtitle')!
      }
      isLoading={isLoading}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      submitLabel={
        t('pages.reset_password.components.verify_email_form.buttons.submit')!
      }
    >
      <Grid item xs={12}>
        <FormControl variant="outlined" sx={classes.formControl} required>
          <TextField
            required
            type="email"
            label={t(
              'pages.reset_password.components.verify_email_form.email_label'
            )}
            value={userEmail}
            fullWidth
            onChange={(e) => setUserEmail(e.target.value)}
            id="textfield-verify-user-email"
            placeholder="email@exemplo.com"
          />
        </FormControl>
      </Grid>
    </FormPaper>
  )
}

export default VerifyEmailForm
