import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { aboutImage } from '../../images'
import { theme } from '../../styles'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    backgroundColor: '#f5f5f4',
    [theme.breakpoints.up('md')]: {
      height: '380px'
    },
    [theme.breakpoints.down('md')]: {
      height: 'auto'
    }
  },
  illustration: {
    backgroundImage: `url(${aboutImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',

    [theme.breakpoints.up('md')]: {},
    [theme.breakpoints.down('md')]: {
      height: '380px',
      backgroundPosition: 'center top'
    },
    [theme.breakpoints.down('sm')]: {
      height: '240px',

      backgroundRepeat: 'no-repeat'
    }
  },
  secondaryButton: {
    backgroundColor: `${theme.palette.primary.light} !important`,
    color: `${theme.palette.primary.main} !important`,
    fontWeight: 'bold'
  },
  titleSpan: {
    color: theme.palette.primary.main
  }
})

const About: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box
      width="100%"
      id="about-section"
      component="section"
      flexDirection={{ md: 'row', xs: 'column' }}
      alignItems={{ md: 'auto', xs: 'center' }}
      justifyContent={{ md: 'space-between', xs: 'center' }}
      pl={{ lg: 16, md: 6, xs: 0 }}
      className={classes.root}
      gap={{ xs: 1, md: 8 }}
      flex="1 0 auto"
    >
      <Box
        width={{ xs: 1, md: 0.5 }}
        textAlign={{ md: 'left', xs: 'center' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt={{ md: 0, xs: 8 }}
        order={{ md: 0, xs: 1 }}
        py={{ xs: 3, lg: 0 }}
      >
        <Typography fontSize={36} fontWeight="bold" lineHeight="146.28%">
          {t('organisms.home_about.title')}{' '}
          <span className={classes.titleSpan}> Match</span>
        </Typography>
        <Typography
          fontSize={14}
          fontFamily="Montserrat"
          lineHeight="146.28%"
          fontWeight="bold"
          color={theme.palette.grey[600]}
          mt={2}
        >
          {t('organisms.home_about.subtitle')}
        </Typography>

        <Box
          display="flex"
          mt={8}
          gap={2}
          justifyContent={{ md: 'flex-start', xs: 'center' }}
        >
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
          >
            {t('organisms.home_about.family')}
          </Button>
          <Button
            className={classes.secondaryButton}
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
          >
            Au Pair
          </Button>
        </Box>
      </Box>
      <Box width="100%" className={classes.illustration} />
    </Box>
  )
}

export default About
