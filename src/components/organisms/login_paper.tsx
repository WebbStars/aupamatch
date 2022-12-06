import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../styles'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link,
  CircularProgress,
  Tooltip
} from '@mui/material'
import { Visibility, VisibilityOff, Google } from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { CustomButton } from '../atoms'
import { Button } from '@mui/material'
import { internalLogin } from '../../services'
import { useDispatch } from '../../store'
import { setErrorMessage } from '../../store/notifications'

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25) !important',
    borderRadius: '8px',
    margin: '15px 0',
    height: 'auto !important',

    [theme.breakpoints.up('md')]: {
      width: '600px',
      padding: '0 72px',
      height: '80%'
    },
    [theme.breakpoints.down('md')]: {
      width: '600px',
      padding: '0 72px',
      height: '80%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '320px',
      padding: '0 32px',
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
      width: '260px'
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
  email: string
  password: string
  showPassword: boolean
}

const LoginPaper: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [form, setForm] = useState<State>({
    email: '',
    password: '',
    showPassword: false
  })
  const [isLoading, setIsLoading] = useState(false)

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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleInternalLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const { email, password } = form
    const payload = {
      email,
      password
    }

    const { response, hasError, error } = await internalLogin(payload)

    if (response) {
      const { accessToken, roles, id } = response

      sessionStorage.setItem('accessToken', accessToken)
      sessionStorage.setItem('role', roles[0])
      sessionStorage.setItem('userID', id)

      if (roles[0] === 'ROLE_FAMILY') navigate('/search_aupair')
      else navigate('/jobs')
    }

    if (hasError && error === 'invalid_credentials') {
      dispatch(setErrorMessage(t('organisms.login_paper.invalid_credentials')!))
    }
    setIsLoading(false)
  }

  return (
    <Paper
      className={classes.paper}
      component="form"
      onSubmit={handleInternalLogin}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={1}
        my={{ sm: 8, xs: 2 }}
        textAlign="center"
      >
        <Typography fontSize={{ md: 40, sm: 32, xs: 24 }} fontWeight="bold">
          {t('organisms.login_paper.sign_in')}
          <br />
          <span className={classes.titleSpan}>AupaMatch</span>
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" width={1}>
        <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
          <InputLabel htmlFor="email-input">
            {t('organisms.login_paper.email')}
          </InputLabel>
          <OutlinedInput
            id="email-input"
            type="text"
            placeholder="Insira seu email"
            value={form.email}
            onChange={handleChange('email')}
            label="Email"
            disabled={isLoading}
            required
          />
        </FormControl>
        <FormControl sx={{ my: 1, width: 1 }} variant="outlined" required>
          <InputLabel htmlFor="password-input">
            {t('organisms.login_paper.password')}
          </InputLabel>
          <OutlinedInput
            id="password-input"
            type={form.showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange('password')}
            placeholder="Insira sua senha"
            disabled={isLoading}
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
            label="Senha"
          />
        </FormControl>
        <Link
          component={RouterLink}
          to="#"
          underline="none"
          className={classes.link}
        >
          {t('organisms.login_paper.login_problem')}
        </Link>

        <CustomButton
          width="100%"
          height="48px"
          margin="24px 0 0 0"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size="22px" color="secondary" />
          ) : (
            t('organisms.login_paper.btn_sign_in')
          )}
        </CustomButton>

        <Box
          display="flex"
          width={1}
          alignItems="center"
          justifyContent="center"
          mt={4}
        >
          <Box border={`1px solid ${theme.palette.common.black}`} width={0.1} />
          <Typography marginX={2} fontWeight="bold">
            {t('organisms.login_paper.or_sign_in_with')}
          </Typography>
          <Box border={`1px solid ${theme.palette.common.black}`} width={0.1} />
        </Box>

        <Tooltip title={t('global.disabled')}>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              className={classes.socialButton}
              onClick={() => {}}
              disabled
              sx={{ bgcolor: '#eeeef0' }}
            >
              <Google fontSize="small" />
              <Typography
                fontSize="10px"
                ml={2}
                fontWeight="800"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Google
              </Typography>
            </Button>
          </Box>
        </Tooltip>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={1}
          my={{ sm: 8, xs: 2 }}
        >
          <Typography
            fontSize={{ md: 'medium', xs: 'small' }}
            fontWeight="bold"
          >
            {t('organisms.login_paper.no_account_yet')}
          </Typography>
          <Link
            component={RouterLink}
            to="/register"
            underline="none"
            className={classes.link}
          >
            <Typography
              ml={1}
              fontSize={{ md: 'medium', xs: 'small' }}
              fontWeight="bold"
            >
              {t('organisms.login_paper.register')}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Paper>
  )
}

export default LoginPaper
