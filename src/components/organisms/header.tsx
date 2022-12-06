import { Box, Button, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ChangeLanguage from './change_language'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Box
      width="100%"
      display="flex"
      paddingY={4}
      height={100}
      alignItems="center"
      justifyContent="space-between"
      px={{ lg: 16, md: 6, xs: 2 }}
      sx={{ boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)', zIndex: 1 }}
      flexShrink="0"
    >
      <Tooltip title="Home">
        <Button onClick={() => navigate('/')}>
          <Typography
            fontWeight="bold"
            fontSize="20px"
            textTransform="capitalize"
          >
            AupaMatch
          </Typography>
        </Button>
      </Tooltip>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={{ xs: 0, md: 6 }}
      >
        <Button onClick={() => navigate('/login')}>
          <Typography color="#6B7280">
            {t('organisms.header.sign_in')}
          </Typography>
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate('/register')}
          size="large"
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Typography> {t('organisms.header.sign_up')}</Typography>
        </Button>

        <ChangeLanguage flags />
      </Box>
    </Box>
  )
}

export default Header
