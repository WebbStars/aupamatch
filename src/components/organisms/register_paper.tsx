import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../styles'
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Grid,
  CircularProgress,
  Tooltip,
  TextField,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { CustomButton } from '../atoms'
import RPI from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useTranslation } from 'react-i18next'
import { createUser } from '../../services'
import { useNavigate } from 'react-router-dom'
import useValidate from '../../hooks/use_validate'
import FormValidateRules from '../molecules/form_validate_rules'
import ErrorMessage from '../molecules/error_message'
import { setErrorMessage, setSuccessMessage } from '../../store/notifications'
import { useDispatch } from '../../store'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PhoneInput = RPI.default || RPI

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25) !important',
    borderRadius: '8px',
    margin: '15px auto',

    [theme.breakpoints.up('md')]: {
      width: '600px',
      padding: '34px 72px',
      height: '800px'
    },
    [theme.breakpoints.down('md')]: {
      width: '600px',
      padding: '34px 72px',
      height: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      width: '320px',
      padding: '34px 32px',
      height: 'auto'
    }
  },
  link: {
    transition: '0.4s',
    '&:hover': {
      color: `${theme.palette.primary.main}`
    },
    fontSize: '12px',
    fontWeight: 'bold'
  },
  socialButton: {
    color: `${theme.palette.common.black} !important`,
    height: '40px',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    border: '1px solid #ebebeb !important',

    [theme.breakpoints.up('sm')]: {
      width: '140px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '80px'
    }
  },
  titleSpan: {
    color: theme.palette.primary.main
  }
})

interface State {
  username: string
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  type: string
  showPassword: boolean
  showConfirmPassword: boolean
}

const RegisterPaper: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { password, email } = useValidate()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [passwordNotEqual, setPasswordNotEqual] = useState<boolean>(false)
  const [invalidRules, setInvalidRules] = useState<boolean>(false)
  const [form, setForm] = useState<State>({
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    type: '',
    showPassword: false,
    showConfirmPassword: false
  })
  const [emailCheck, setEmailCheck] = useState({
    error: false,
    exists: false,
    message: ''
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword
    })
  }
  const handleClickShowConfirmPassword = () => {
    setForm({
      ...form,
      showConfirmPassword: !form.showConfirmPassword
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const newPasswordConfirm = form.password === form.confirmPassword

  const passwordValidRules =
    password.validateLength(form.password) &&
    password.validateCaseLetters(form.password) &&
    password.validateNumber(form.password) &&
    password.validateSpecialChar(form.password)

  useEffect(() => {
    setPasswordNotEqual(false)
  }, [form.password, form.confirmPassword])

  const handleEmailError = () => {
    if (!email.isValid(form.email)) {
      setEmailCheck({
        error: !email.isValid(form.email),
        message: 'Email inválido',
        exists: false
      })
    }

    return !email.isValid(form.email)
  }

  const handlePasswordError = () => {
    const isPasswordConfirmValid = newPasswordConfirm
    setPasswordNotEqual(!isPasswordConfirmValid)
    setInvalidRules(!passwordValidRules)

    return isPasswordConfirmValid
  }

  const validFields = () => {
    const invalidFields =
      !handlePasswordError() ||
      !passwordValidRules ||
      handleEmailError() ||
      !form.type

    if (invalidFields) return false

    return true
  }

  const handleInternalRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!validFields()) {
      dispatch(setErrorMessage(t('organisms.register_paper.invalid_fields')!))
      return
    }

    setIsLoading(true)

    const { email, name, password, type } = form

    const payload = {
      email,
      name,
      password,
      roles: type
    }

    const { response, statusCode } = await createUser(payload)

    if (response) {
      dispatch(
        setSuccessMessage(t('organisms.register_paper.success_created')!)
      )

      navigate('/login')
      setIsLoading(false)
      return
    }
    if (statusCode === 400) {
      dispatch(
        setErrorMessage(t('organisms.register_paper.email_already_used')!)
      )
      setIsLoading(false)
    }
  }

  const rules = [
    {
      isValid: password.validateLength(form.password),
      text: t('organisms.register_paper.characters_number')
    },
    {
      isValid: !!password.validateCaseLetters(form.password),
      text: t('organisms.register_paper.letters_case')
    },
    {
      isValid: !!password.validateNumber(form.password),
      text: t('organisms.register_paper.least_one_number')
    },
    {
      isValid: !!password.validateSpecialChar(form.password),
      text: t('organisms.register_paper.least_special')
    }
  ]

  return (
    <Paper
      className={classes.paper}
      component="form"
      onSubmit={handleInternalRegister}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={1}
        textAlign="center"
      >
        <Typography fontSize={{ md: 40, sm: 32, xs: 24 }} fontWeight="bold">
          {t('organisms.register_paper.title')} <br />
          <span className={classes.titleSpan}>AupaMatch</span>
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" width={1}>
        <Tooltip title="Campo desabilitado por ora">
          <FormControl sx={{ my: 1, width: 1 }} variant="outlined" disabled>
            <InputLabel htmlFor="email-input">
              {t('organisms.register_paper.username')}
            </InputLabel>
            <OutlinedInput
              id="username-input"
              type="text"
              placeholder={t('organisms.register_paper.username_placeholder')!}
              value={form.username}
              onChange={handleChange('username')}
              label={t('organisms.register_paper.username')}
              sx={{ bgcolor: '#eeeef0' }}
            />
          </FormControl>
        </Tooltip>
        <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
          <InputLabel htmlFor="email-input">
            {t('organisms.register_paper.name')}
          </InputLabel>
          <OutlinedInput
            id="name-input"
            type="text"
            placeholder={t('organisms.register_paper.name_placeholder')!}
            value={form.name}
            onChange={handleChange('name')}
            label={t('organisms.register_paper.name')}
            required
          />
        </FormControl>

        <Grid container spacing={1} display="flex" alignItems="center">
          <Grid item xs={6}>
            <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
              <TextField
                id="email-input"
                type="text"
                placeholder={t('organisms.register_paper.email_placeholder')!}
                value={form.email}
                onChange={handleChange('email')}
                label={t('organisms.register_paper.email')}
                required
                helperText={
                  <>
                    {emailCheck.error && (
                      <ErrorMessage
                        isWarning={emailCheck.exists}
                        message={emailCheck.message}
                        transComponents={[
                          <span key="trans-error-message-span" />,
                          <strong key="trans-error-message-strong" />
                        ]}
                      />
                    )}
                  </>
                }
              />
            </FormControl>
          </Grid>

          <Tooltip title="Campo desabilitado por ora">
            <Grid item xs={6}>
              <PhoneInput
                disabled
                country={'br'}
                value={form.phone}
                onChange={() => handleChange('phone')}
                inputStyle={{
                  width: '100%',
                  backgroundColor: '#cccc'
                }}
              />
            </Grid>
          </Tooltip>
        </Grid>

        <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
          <InputLabel htmlFor="password-input">
            {t('organisms.register_paper.password')}
          </InputLabel>
          <OutlinedInput
            id="password-input"
            type={form.showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange('password')}
            placeholder={t('organisms.register_paper.password_placeholder')!}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {form.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={t('organisms.register_paper.password')}
          />
        </FormControl>
        <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
          <TextField
            id="confirm-password-input"
            type={form.showConfirmPassword ? 'text' : 'password'}
            value={form.confirmPassword}
            error={!!form.confirmPassword && passwordNotEqual}
            required
            helperText={
              form.confirmPassword &&
              (passwordNotEqual || invalidRules) && (
                <ErrorMessage
                  message={
                    passwordNotEqual
                      ? 'As senhas não conferem'
                      : 'Crie sua senha com base nas regras abaixo'
                  }
                />
              )
            }
            onChange={handleChange('confirmPassword')}
            placeholder={
              t('organisms.register_paper.confirm_password_placeholder')!
            }
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {form.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              )
            }}
            label={t('organisms.register_paper.confirm_password')}
          />
        </FormControl>

        <FormControl required sx={{ marginTop: 2 }}>
          <FormLabel>{t('organisms.register_paper.type')}</FormLabel>
          <RadioGroup
            row
            name="type"
            value={form.type}
            onChange={handleChange('type')}
          >
            <FormControlLabel
              value="family"
              control={<Radio required />}
              label="Family"
            />
            <FormControlLabel
              value="aupair"
              control={<Radio required />}
              label="Aupair"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <CustomButton
        width="100%"
        height="48px"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size="22px" color="secondary" />
        ) : (
          t('organisms.register_paper.sign_up')
        )}
      </CustomButton>
      <FormValidateRules
        title={t('organisms.register_paper.rules_title')}
        rules={rules}
      />
    </Paper>
  )
}

export default RegisterPaper
