import { makeStyles } from '@material-ui/styles'
import { Box, Typography, Link } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f9fafb'
  }
})

interface Props {
  family?: boolean
}

const Footer: React.FC<Props> = ({ family = false }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      minHeight={family ? 218 : 260}
      width="100%"
      display="flex"
      flexDirection="column"
      py={3}
      gap={2}
      alignItems="center"
      justifyContent="center"
      sx={{ boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.25)', zIndex: 1 }}
      flexShrink="0"
      className={classes.root}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={4}
        textAlign={{ xs: 'center' }}
      >
        <Link to="/" underline="none" component={RouterLink}>
          {t('organisms.footer.about')}
        </Link>
        <Link to="/" underline="none" component={RouterLink}>
          {t('organisms.footer.help')}
        </Link>
        <Link to="/" underline="none" component={RouterLink}>
          {t('organisms.footer.family')}
        </Link>
        <Link to="/" underline="none" component={RouterLink}>
          {t('organisms.footer.accessibility')}
        </Link>
        <Link to="/" underline="none" component={RouterLink}>
          {t('organisms.footer.contact')}
        </Link>
        <Link to="/" underline="none" component={RouterLink}>
          {t('organisms.footer.partners')}
        </Link>
      </Box>

      <Typography textAlign={{ xs: 'center' }}>
        © 2022 AupaMatch, {t('organisms.footer.copy')}
      </Typography>
    </Box>
  )
}

export default Footer
