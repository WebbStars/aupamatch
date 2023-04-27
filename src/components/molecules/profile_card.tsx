import { makeStyles } from '@material-ui/styles'
import { Box, Button, Paper, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../../styles'
import { companyDefaultImage } from '../../images'
import { useTranslation } from 'react-i18next'
import { useSelector } from '../../store'
import { SkeletonHOC } from '../atoms'

const useStyles = makeStyles({
  paper: {
    padding: '32px 13px 18px 13px',
    borderRadius: 10,
    height: '300px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photo: {
    backgroundImage: `url(${companyDefaultImage})`,
    backgroundSize: 'cover',
    height: '80px',
    width: '80px',
    borderRadius: '50%',
  },
  btn: {
    backgroundColor: `${theme.palette.grey[200]} !important`,
    color: '#000 !important',
    width: '100% !important',
  },
})

interface Props {
  isFetching: boolean
}

const ProfileCard: React.FC<Props> = ({ isFetching }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const user = useSelector((state) => state.userProfile)

  return (
    <Paper className={classes.paper}>
      <Box className={classes.photo} />

      <Box textAlign="center">
        <SkeletonHOC
          animation="wave"
          variant="text"
          height={32}
          isLoading={isFetching}
        >
          <Typography fontWeight="bold">{user?.name}</Typography>
        </SkeletonHOC>
        <Typography fontSize={12} color={theme.palette.grey[500]}>
          Au Pair
        </Typography>
      </Box>

      <Tooltip title={t('global.disabled')}>
        <Button className={classes.btn} size="large" disabled>
          <Typography fontWeight="bold" textTransform="capitalize">
            {t('molecules.profile_card.profile_button')}
          </Typography>
        </Button>
      </Tooltip>
    </Paper>
  )
}

export default ProfileCard
