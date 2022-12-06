import {
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@mui/material'
import React from 'react'
import { NotificationsNone, BookmarkBorderOutlined } from '@mui/icons-material'
import UserAccounts from './user_account'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../styles'
import { useTranslation } from 'react-i18next'

interface Props {
  family?: boolean
  hideLinks?: boolean
}

const LoggedHeader: React.FC<Props> = ({ family = false, hideLinks }) => {
  const currentPage = window.location.pathname
  const navigate = useNavigate()
  const { t } = useTranslation()

  const activeMenuLink = (path: string) => {
    return currentPage === path ? 'primary' : theme.palette.text.primary
  }

  return (
    <Box
      width="100%"
      display="flex"
      paddingY={4}
      paddingX={6}
      height={100}
      alignItems="center"
      justifyContent={!hideLinks ? 'space-between' : 'flex-end'}
      sx={{ boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)', zIndex: 1 }}
    >
      {!hideLinks && (
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
      )}

      {!hideLinks && (
        <Box
          component="section"
          gap={6}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <Link
            to={family ? '/search_aupair' : '/jobs'}
            underline="none"
            color={activeMenuLink(family ? '/search_aupair' : '/jobs')}
            component={RouterLink}
            fontWeight="bold"
          >
            {family
              ? t('organisms.logged_header.family.post_job')
              : t('organisms.logged_header.aupair.search_job')}
          </Link>

          <Tooltip title={t('global.disabled')}>
            <Link
              to="#"
              underline="none"
              color="grey"
              component={RouterLink}
              fontWeight="bold"
              sx={{ opacity: '0.5' }}
            >
              {family
                ? t('organisms.logged_header.family.my_jobs')
                : t('organisms.logged_header.aupair.my_applies')}
            </Link>
          </Tooltip>
          <Tooltip title={t('global.disabled')}>
            <Link
              to="#"
              underline="none"
              color="grey"
              component={RouterLink}
              fontWeight="bold"
              sx={{ opacity: '0.5' }}
            >
              {t('organisms.logged_header.my_profile')}
            </Link>
          </Tooltip>
        </Box>
      )}

      <Box
        component="section"
        display="flex"
        alignItems="center"
        justifyContent="space"
        gap={1}
      >
        <IconButton>
          <Badge color="secondary" variant="dot">
            <NotificationsNone />
          </Badge>
        </IconButton>

        {!family && (
          <IconButton>
            <BookmarkBorderOutlined />
          </IconButton>
        )}
        <UserAccounts />
      </Box>
    </Box>
  )
}

export default LoggedHeader
