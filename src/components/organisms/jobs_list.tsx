import { makeStyles } from '@material-ui/styles'
import { Box, Grid, Pagination, useMediaQuery } from '@mui/material'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { fetchAppliesService, FetchAupairJobState } from '../../services'
import { useDispatch } from '../../store'
import { fetchAupairJobs } from '../../store/jobs'
import { theme } from '../../styles'
import { SkeletonHOC } from '../atoms'
import { OpportunityCard } from '../molecules'

const useStyles = makeStyles({
  jobsList: {
    // marginTop: 16,
    overflow: 'auto',
    position: 'relative',
    height: '716px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },

    '&::-webkit-scrollbar': {
      backgroundColor: '#202324',
      color: '#aba499',
      width: '12px',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: '#181a1b',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#454a4d',
    },
  },
})

interface Props {
  selectedJob: any
  setSelectedJob: Dispatch<SetStateAction<any>>
  isFetching: boolean
  setIsFetching: Dispatch<SetStateAction<boolean>>
  setOpenJobModal?: Dispatch<SetStateAction<boolean>>
  setApplies: Dispatch<SetStateAction<string[]>>
}

interface JobsList {
  job: FetchAupairJobState
  uuid: string
  title: string
  description: string
  tags: (string | false)[]
  tagsResume: (string | false)[]
}

const JobsList: React.FC<Props> = ({
  selectedJob,
  setSelectedJob,
  isFetching,
  setIsFetching,
  setOpenJobModal,
  setApplies,
}) => {
  const { t } = useTranslation()

  // const [selectedTab, setSelectedTab] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [jobsList, setJobsList] = useState<JobsList[]>([])

  const classes = useStyles()
  const dispatch = useDispatch()
  const jobsListRef = useRef<null | HTMLDivElement>(null)

  const userID = sessionStorage.getItem('userID')
  const accessToken = sessionStorage.getItem('accessToken')
  const role = sessionStorage.getItem('role')

  const matchesLg = useMediaQuery(theme.breakpoints.down('lg'))

  const fetchApplies = async () => {
    const { response: appliesResponse } = await fetchAppliesService(
      accessToken!
    )

    let appliesJobsIds: string[] = []

    if (appliesResponse) {
      appliesResponse.map((job) => {
        appliesJobsIds.push(job._id)
      })

      setApplies(appliesJobsIds)
    }
  }

  const fetchUserData = async () => {
    const { payload } = dispatch(
      await fetchAupairJobs(userID!, role!, accessToken!)
    )
    await fetchApplies()

    const formmatedList = payload.map((job) => {
      const cnh = job['habilitacao'] && t('organisms.jobs_list.car_license')
      const natacao = job['natacao'] && t('organisms.jobs_list.swim')
      const car = job['carro_exclusivo'] && t('organisms.jobs_list.car')
      const genero = job.genero

      const jobsTag = [
        `${job.quantidade_criancas} filhos`,
        genero,
        job.pais,
        job.idioma,
        job.religiao,
        cnh,
        natacao,
        car,
      ]
      const tagsResume = jobsTag.slice(0, 3)

      return {
        job: job,
        uuid: job['_id'],
        title: job.titulo_vaga,
        description: job.descricao,
        tags: jobsTag,
        tagsResume,
      }
    })

    const sortedList =
      role === 'ROLE_AGENCY'
        ? formmatedList
        : formmatedList.sort(
            (a, b) =>
              Number(b.job.score.slice(0, -1)) -
              Number(a.job.score.slice(0, -1))
          )

    setJobsList(sortedList)
    setIsFetching(false)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const perPage = 5
  const numberOfPages = jobsList.length && Math.ceil(jobsList.length / perPage)

  const fetchSelectedJob = async (id: string) => {
    // const selectedJob = await fetchSelectedJob(id)
    const selectedJob = jobsList.filter((job) => job.uuid === id)[0]
    setSelectedJob(selectedJob)

    if (matchesLg) {
      setOpenJobModal && setOpenJobModal(true)
    }
  }

  useEffect(() => {
    if (jobsList.length) setSelectedJob(jobsList[0])
  }, [jobsList])

  const handleCurrentPage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)

    setSelectedJob(jobsList[perPage * (value - 1)])

    jobsListRef.current?.scroll(0, 0)
  }

  return (
    <Grid>
      {/* <JobsHeader value={selectedTab} setValue={setSelectedTab} /> */}
      <Box className={classes.jobsList} ref={jobsListRef}>
        <SkeletonHOC
          variant="rectangular"
          animation="wave"
          isLoading={isFetching}
          height={232}
        >
          <>
            {jobsList
              .slice(perPage * (currentPage - 1), perPage * currentPage)
              .map((job, index) => (
                <OpportunityCard
                  key={job.uuid + index}
                  job={job}
                  onClick={() => fetchSelectedJob(job.uuid)}
                  selected={selectedJob?.uuid === job.uuid}
                />
              ))}
          </>
        </SkeletonHOC>
        <Pagination
          count={numberOfPages}
          color="primary"
          onChange={handleCurrentPage}
        />
      </Box>
    </Grid>
  )
}

export default JobsList
