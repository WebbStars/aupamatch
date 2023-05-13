import React, { useState } from 'react'
import FormPaper from '../form_paper'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import classes from './styles'
import { changePassword } from '../../services/change_password'
import useValidate from '../../../../../hooks/use_validate'
import { useDispatch } from '../../../../../store'
import {
  setErrorMessage,
  setSuccessMessage,
} from '../../../../../store/notifications'
import FormValidateRules from '../../../../molecules/form_validate_rules'
import { PasswordInput } from '../../../../molecules'

type StateType = {
  token: string
  userEmail: string
}

type Form = {
  email: string
  password: string
  confirmation?: string
}

const ChangePasswordForm: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { password } = useValidate()
  const location = useLocation()
  const { userEmail } = (location?.state as StateType) || ''

  console.log(userEmail)

  const [isLoading, setIsLoading] = useState(false)
  const [passwordNotEqual, setPasswordNotEqual] = useState(false)
  const [form, setForm] = useState<Form>({
    email: userEmail,
    password: '',
    confirmation: '',
  })

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
      text: t('organisms.register_paper.characters_number'),
    },
    {
      isValid: !!password.validateCaseLetters(form.password),
      text: t('organisms.register_paper.letters_case'),
    },
    {
      isValid: !!password.validateNumber(form.password),
      text: t('organisms.register_paper.least_one_number'),
    },
    {
      isValid: !!password.validateSpecialChar(form.password),
      text: t('organisms.register_paper.least_special'),
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
    invalid: () => {
      navigate('/verify_email')
      dispatch(
        setErrorMessage(
          t(
            'pages.reset_password.components.change_password.responses.invalid'
          )!
        )
      )
    },
    notFound: () => {
      navigate('/verify_email')
      dispatch(
        setErrorMessage(
          t(
            'pages.reset_password.components.change_password.responses.not_found'
          )!
        )
      )
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

    const newForm = { ...form }
    delete newForm?.confirmation

    const { response, hasError, statusCode } = await changePassword(newForm)

    if (response) {
      dispatchEvent.successReset()
      return
    }

    if (hasError) {
      if (statusCode === 400) dispatchEvent.invalid()
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
