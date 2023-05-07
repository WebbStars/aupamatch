import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, useMediaQuery } from '@mui/material'
// import { ProfileCard, ProfileCardData } from '../molecules'
import { JobDetails, JobDetailsModal, JobsList } from '../organisms'
import LoggedTemplate from '../templates/logged'
import { theme } from '../../styles'
import { fetchUser, fetchUserProfile } from '../../store/user'
import { useDispatch } from '../../store'

const useStyles = makeStyles({
  main: {
    display: 'grid',
    gap: 32,
    padding: '36px 40px',
    width: '100%',

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1.4fr 2fr',
    },
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },
  },
})

interface Job {
  uuid: string
  title: string
  description: string
  tags: string[]
}

const initialValue = {
  uuid: '',
  title: '',
  description: '',
  tags: [],
}

const Jobs: React.FC = () => {
  const classes = useStyles()
  const [selectedJob, setSelectedJob] = useState<Job>(initialValue)
  const [isFetching, setIsFetching] = useState(true)
  const [openJobModal, setOpenJobModal] = useState(false)
  const [applies, setApplies] = useState<string[]>([])

  const matchesMd = useMediaQuery(theme.breakpoints.up('md'))
  const dispatch = useDispatch()

  sessionStorage.setItem('logged', 'true')

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = sessionStorage.getItem('accessToken')

      await Promise.all([
        dispatch(await fetchUser(accessToken!)),
        dispatch(await fetchUserProfile(accessToken!)),
      ])
    }

    fetchUserData()
  }, [])

  return (
    <LoggedTemplate>
      <Box className={classes.main}>
        <JobsList
          setOpenJobModal={setOpenJobModal}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          isFetching={isFetching}
          setIsFetching={setIsFetching}
          setApplies={setApplies}
        />
        {matchesMd ? (
          <JobDetails
            selectedJob={selectedJob}
            isFetching={isFetching}
            wasApplied={applies.includes(selectedJob.uuid)}
          />
        ) : (
          <JobDetailsModal
            open={openJobModal}
            setOpen={setOpenJobModal}
            selectedJob={selectedJob}
            isFetching={isFetching}
            wasApplied={applies.includes(selectedJob.uuid)}
          />
        )}

        {/* {matchesLg && (
          <Box display="flex" flexDirection="column" gap={2}>
            <ProfileCard isFetching={isFetching} />
            <Box flex={20}>
              <ProfileCardData />
            </Box>
          </Box>
        )} */}
      </Box>
    </LoggedTemplate>
  )
}

export default Jobs
