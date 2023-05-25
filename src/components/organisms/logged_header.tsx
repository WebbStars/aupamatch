import {
  // Badge,
  Box,
  Button,
  Link,
  Tooltip,
  Typography,
} from '@mui/material'
import React from 'react'
import {
  // NotificationsNone,
  BookmarkBorderOutlined,
  Bookmark,
} from '@mui/icons-material'
import UserAccounts from './user_account'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../styles'
import { useTranslation } from 'react-i18next'

interface Props {
  family?: boolean
  agency?: boolean
  hideLinks?: boolean
}

const LoggedHeader: React.FC<Props> = ({
  family = false,
  agency = false,
  hideLinks,
}) => {
  const currentPage = window.location.pathname.split('/')[1]
  const navigate = useNavigate()
  const { t } = useTranslation()

  const activeMenuLink = (path: string | string[]) => {
    const isPrimary = Array.isArray(path)
      ? path.includes(currentPage)
      : currentPage === path

    return isPrimary ? 'primary' : theme.palette.text.primary
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
          {agency && (
            <Link
              to="/jobs"
              underline="none"
              color={activeMenuLink('jobs')}
              component={RouterLink}
              fontWeight="bold"
            >
              {t('organisms.logged_header.aupair.search_job')}
            </Link>
          )}
          <Link
            to={family || agency ? '/search_aupair' : '/jobs'}
            underline="none"
            color={activeMenuLink(
              family || agency
                ? ['search_aupair', 'post_job', 'edit_job']
                : 'jobs'
            )}
            component={RouterLink}
            fontWeight="bold"
          >
            {family || agency
              ? t('organisms.logged_header.family.post_job')
              : t('organisms.logged_header.aupair.search_job')}
          </Link>

          <Link
            to={family || agency ? '/my_jobs' : '/my_applies'}
            underline="none"
            color={activeMenuLink(family || agency ? 'my_jobs' : 'my_applies')}
            component={RouterLink}
            fontWeight="bold"
          >
            {family || agency
              ? t('organisms.logged_header.family.my_jobs')
              : t('organisms.logged_header.aupair.my_applies')}
          </Link>

          <Link
            to="/my_profile"
            underline="none"
            color={activeMenuLink('my_profile')}
            component={RouterLink}
            fontWeight="bold"
          >
            {t('organisms.logged_header.my_profile')}
          </Link>
        </Box>
      )}

      <Box
        component="section"
        display="flex"
        alignItems="center"
        justifyContent="space"
        gap={1}
      >
        {/* <IconButton>
          <Badge variant="dot">
            <NotificationsNone />
          </Badge>
        </IconButton> */}

        {!family && !agency && (
          <Button variant="text" onClick={() => navigate('/favorite_jobs')}>
            <Typography
              fontWeight="bold"
              fontSize="12px"
              color={currentPage === 'favorite_jobs' ? 'primary' : 'grey.600'}
              sx={{ cursor: 'pointer' }}
            >
              Favoritas
            </Typography>
            {currentPage === 'favorite_jobs' ? (
              <Bookmark color="primary" />
            ) : (
              <BookmarkBorderOutlined sx={{ color: 'grey.600' }} />
            )}
          </Button>
        )}
        <UserAccounts />
      </Box>
    </Box>
  )
}

export default LoggedHeader
