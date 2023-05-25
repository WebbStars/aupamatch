import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, useMediaQuery } from '@mui/material'
// import { ProfileCard, ProfileCardData } from '../molecules'
import { JobDetails, JobDetailsModal, JobsList } from '../organisms'
import LoggedTemplate from '../templates/logged'
import { theme } from '../../styles'
import { fetchUser, fetchUserProfile } from '../../store/user'
import { useDispatch } from '../../store'
import {
  FetchApplies,
  FetchUserProfileState,
  agencyJob,
  contractMoreApplies,
  fetchAppliesService,
} from '../../services'
import NeedContract from './contract'
import { setErrorMessage } from '../../store/notifications'

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
  const [applies, setApplies] = useState<FetchApplies[]>([])
  const [openJobModal, setOpenJobModal] = useState(false)
  const [needPayment, setNeedPayment] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [appliesIds, setAppliesIds] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<FetchUserProfileState>(
    {} as any
  )
  const [isPaying, setIsPaying] = useState(false)
  const [jobsList, setJobsList] = useState<JobsList[]>([])

  const matchesLg = useMediaQuery(theme.breakpoints.up('lg'))
  const dispatch = useDispatch()

  const accessToken = sessionStorage.getItem('accessToken')
  const role = sessionStorage.getItem('role')
  sessionStorage.setItem('logged', 'true')

  const fetchUserData = async () => {
    const accessToken = sessionStorage.getItem('accessToken')

    const [_user, userProfile, userApplies] = await Promise.all([
      dispatch(await fetchUser(accessToken!)),
      dispatch(await fetchUserProfile(accessToken!)),
      await fetchAppliesService(accessToken!),
    ])

    const { payload } = userProfile
    if (payload) setCurrentUser(payload)

    const { response } = userApplies
    if (response) setApplies(response)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    if (currentUser.pagamentoPublicador || !isPaying) return

    const refreshIntervalId = setInterval(async () => {
      await fetchUserData()
    }, 5000)

    return () => {
      window.clearInterval(refreshIntervalId)
    }
  }, [currentUser.pagamentoPublicador])

  const paymentMoreApplies = async () => {
    setIsLoading(true)
    const { response } = await contractMoreApplies(accessToken!)

    setIsLoading(false)
    if (response) {
      setIsPaying(true)
      window.open(response.approvalUrl, '_blank')!.focus()
      return
    }

    dispatch(
      setErrorMessage(
        'Erro ao tentar realizar o pagamento, tente novamente mais tarde!'
      )
    )
  }

  const toAgencyJob = async () => {
    setIsLoading(true)

    const { hasError, response } = await agencyJob(
      accessToken!,
      selectedJob.uuid
    )

    if (hasError) {
      dispatch(setErrorMessage('Erro ao tentar agenciar vaga'))
      return
    }
    if (response) {
      setIsPaying(true)

      window.open(response.approvalUrl, '_blank')!.focus()
    }
  }

  if (needPayment) {
    return (
      <NeedContract
        agency={role === 'ROLE_AGENCY'}
        handleSubmit={role === 'ROLE_AGENCY' ? toAgencyJob : paymentMoreApplies}
        detail={
          role === 'ROLE_AGENCY'
            ? 'Agenciar essa vaga - $50.00'
            : 'Candidatura em +5 vagas por mês - $5.00'
        }
        isLoading={isLoading}
        isPaying={isPaying}
      />
    )
  }

  return (
    <LoggedTemplate agency={role === 'ROLE_AGENCY'}>
      <Box className={classes.main}>
        <JobsList
          setOpenJobModal={setOpenJobModal}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          isFetching={isFetching}
          setIsFetching={setIsFetching}
          setApplies={setAppliesIds}
          jobsList={jobsList}
          setJobsList={setJobsList}
        />
        {matchesLg ? (
          <JobDetails
            setNeedPayment={setNeedPayment}
            applies={applies}
            selectedJob={selectedJob}
            isFetching={isFetching}
            wasApplied={appliesIds.includes(selectedJob.uuid)}
            setJobsList={setJobsList}
          />
        ) : (
          <JobDetailsModal
            setNeedPayment={setNeedPayment}
            applies={applies}
            open={openJobModal}
            setOpen={setOpenJobModal}
            selectedJob={selectedJob}
            isFetching={isFetching}
            wasApplied={appliesIds.includes(selectedJob.uuid)}
            setJobsList={setJobsList}
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
