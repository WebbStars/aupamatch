import React, { useEffect, useState } from 'react'
import FormPaper from '../form_paper'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import classes from './styles'
import { changePassword } from '../../services/change_password'
import { System, validateToken } from '../../services/validate_token'
import SystemSelect from '../system_select'
import useValidate from '../../../../../hooks/use_validate'
import { useDispatch } from '../../../../../store'
import {
  setErrorMessage,
  setSuccessMessage,
} from '../../../../../store/notifications'
import FormValidateRules from '../../../../molecules/form_validate_rules'
import { PasswordInput } from '../../../../molecules'

type StateType = {
  systems: System[]
  token: string
}

type ErrorMessageObject = {
  [key: string]: string
}

const ChangePasswordForm: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { password } = useValidate()
  const location = useLocation()
  const { systems, token } = (location?.state as StateType) || ''

  const [isLoading, setIsLoading] = useState(false)
  const [authSystems, setAuthSystems] = useState<System[]>(systems)
  const [passwordNotEqual, setPasswordNotEqual] = useState(false)
  const [form, setForm] = useState({
    token,
    password: '',
    confirmation: '',
    authenticator_id: '',
  })

  const searhSystemsByUrlToken = async () => {
    const { search } = location

    const urlToken = search.substring(search.indexOf('=') + 1)

    const { response } = await validateToken(urlToken)

    if (response) {
      const { available, systems } = response
      if (!available) {
        dispatch(
          setErrorMessage(t('pages.reset_password.pages.send_token.expired')!)
        )
        navigate('/verify_email')
        return
      }

      setAuthSystems(systems)
      return
    }

    navigate('/verify_email')
    dispatch(
      setErrorMessage(t('pages.reset_password.pages.send_token.invalid_token')!)
    )
  }

  useEffect(() => {
    if (!token) {
      searhSystemsByUrlToken()
    }
  }, [])

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setPasswordNotEqual(false)

    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const rules = [
    {
      isValid: password.validateLength(form.password),
      text: t(
        'pages.reset_password.components.change_password.pwd_rules.length'
      ),
    },
    {
      isValid: !!password.validateCaseLetters(form.password),
      text: t('pages.reset_password.components.change_password.pwd_rules.case'),
    },
    {
      isValid: !!password.validateNumber(form.password),
      text: t(
        'pages.reset_password.components.change_password.pwd_rules.number'
      ),
    },
    {
      isValid: !!password.validateSpecialChar(form.password),
      text: `${t(
        'pages.reset_password.components.change_password.pwd_rules.special'
      )} (_ @ # &)`,
    },
  ]

  const dispatchEvent = {
    successReset: () => {
      navigate('/login')
      dispatch(
        setSuccessMessage(
          t(
            'pages.reset_password.components.change_password.responses.sucess_reset'
          )!
        )
      )
    },
    notFound: () => {
      navigate('/login')
      dispatch(
        setErrorMessage(
          t(
            'pages.reset_password.components.change_password.responses.not_found'
          )!
        )
      )
    },
    unauthorized: (errorTitle: string) => {
      const expiredMessage: ErrorMessageObject = {
        TokenValidationError: t(
          'pages.reset_password.components.change_password.responses.token_expired'
        ),
        RequisitionError: t(
          'pages.reset_password.components.change_password.responses.already_requisition'
        ),
        AuthenticatorIdError: t(
          'pages.reset_password.components.change_password.responses.system_error'
        ),
      }

      dispatch(setErrorMessage(expiredMessage[errorTitle]))
      navigate('/login')
    },
    serverFail: () => {
      navigate('/login')
      dispatch(setErrorMessage(t('pages.reset_password.error')!))
    },
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (form.password !== form.confirmation) {
      setPasswordNotEqual(true)
      setIsLoading(false)

      return
    }

    const { response, hasError, statusCode, error } = await changePassword(form)

    if (response) {
      dispatchEvent.successReset()
      return
    }

    if (hasError) {
      if (statusCode === 401 && error) dispatchEvent.unauthorized(error.title)
      if (statusCode === 404) dispatchEvent.notFound()
      if (statusCode === 500) dispatchEvent.serverFail()
    }

    setIsLoading(false)
  }

  return (
    <FormPaper
      title={t('pages.reset_password.components.change_password.form.title')}
      subtitle={
        t('pages.reset_password.components.change_password.form.subtitle')!
      }
      handleSubmit={handleSubmitForm}
      isLoading={isLoading}
    >
      <Box sx={classes.form}>
        <SystemSelect
          value={form.authenticator_id}
          authSystems={authSystems}
          handleChange={handleChange}
        />

        <PasswordInput
          handleChangeInput={handleChange}
          label={
            t(
              'pages.reset_password.components.change_password.form.password_label'
            )!
          }
        />
        <PasswordInput
          id="reset-flow-input-confirm-password"
          handleChangeInput={handleChange}
          label={
            t(
              'pages.reset_password.components.change_password.form.confirmation_label'
            )!
          }
          name="confirmation"
          error={!!form.confirmation && passwordNotEqual}
          helperText={
            !!form.confirmation && passwordNotEqual
              ? t(
                  'pages.reset_password.components.change_password.form.invalid_confirmation'
                )!
              : ''
          }
        />

        <FormValidateRules
          title={t(
            'pages.reset_password.components.change_password.form.rules_title'
          )}
          rules={rules}
        />
      </Box>
    </FormPaper>
  )
}

export default ChangePasswordForm
