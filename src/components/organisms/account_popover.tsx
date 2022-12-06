import React from 'react'
import {
  Paper,
  Box,
  Button,
  Typography,
  Link,
  IconButton,
  Tooltip
} from '@mui/material'
import { AccountCircle, Logout } from '@mui/icons-material'
import { theme } from '../../styles'
import { makeStyles } from '@material-ui/styles'
import { useNavigate } from 'react-router-dom'
import ChangeLanguage from './change_language'
import { useTranslation } from 'react-i18next'
import { useSelector } from '../../store'

const useStyles = makeStyles({
  divider: {
    borderTop: `2px solid ${theme.palette.grey[300]}`,
    marginBottom: '16px',
    marginLeft: '-50px',
    width: 'calc(100% + 200px)'
  },

  account: {
    display: 'flex',
    width: '280px',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: '8px',
    padding: '16px 32px 0px 32px'
  },
  email: {
    fontSize: '14px',
    marginBottom: '8px'
  },
  name: {
    marginBottom: '8px',
    fontWeight: 500,
    fontSize: '14px'
  },
  exit: {
    borderTop: `2px solid ${theme.palette.grey[300]}`,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.grey[700],
    borderRadius: 0
  },
  alterpassword: {
    marginBottom: '8px',
    fontSize: '12px'
  }
})

const UserAccountsPopover: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const user = useSelector((state) => state.user)

  const logout = () => {
    sessionStorage.clear()
    window.dispatchEvent(new CustomEvent('logout'))
    navigate('/')
  }

  return (
    <Paper elevation={2}>
      <Box>
        <Box className={classes.account}>
          <IconButton id="button-open-user-menu">
            <AccountCircle sx={{ fontSize: '80px' }} />
          </IconButton>

          <Typography fontWeight="bold" sx={{ m: '16px 0' }}>
            {user?.name || t('organisms.account_popover.name')}
          </Typography>

          <ChangeLanguage flags />

          <Box className={classes.divider} />

          <Typography fontWeight="bold" fontSize="small">
            {user?.email || 'nome@email.com'}
          </Typography>
          <Tooltip title={t('global.disabled')}>
            <Link
              onClick={() => {}}
              className={classes.alterpassword}
              sx={{ opacity: '0.5', cursor: 'not-allowed' }}
            >
              {t('organisms.account_popover.change_password')}
            </Link>
          </Tooltip>
        </Box>
      </Box>

      <Button
        className={classes.exit}
        onClick={logout}
        id="button-logout-user"
        sx={{ mt: 2 }}
      >
        <Logout color="primary" />
        <Typography
          color="primary"
          fontSize="small"
          fontWeight="bold"
          sx={{ ml: 1 }}
        >
          {t('organisms.account_popover.logout')}
        </Typography>
      </Button>
    </Paper>
  )
}

export default UserAccountsPopover
