import { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, Pagination } from '@mui/material'
import { SkeletonHOC } from '../atoms'
import { JobDetailsModal, JobsList } from '../organisms'
import OpportunityCard from './opportunity_card'
import { noData, notFound } from '../../images'
import NoData from './no_data'
import { FetchApplies, fetchAppliesService } from '../../services'

const useStyles = makeStyles({
  jobsList: {
    marginTop: 16,
    overflow: 'auto',
    position: 'relative',
    height: '716px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

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
  jobsList: JobsList[]
  setJobsList: React.Dispatch<React.SetStateAction<JobsList[]>>
  perPage: number
  isFetching: boolean
}

const initialValueSelectedJob = {
  uuid: '',
  title: '',
  description: '',
  tags: [],
}

const FavoriteJobsList: React.FC<Props> = ({
  jobsList,
  setJobsList,
  perPage,
  isFetching,
}) => {
  const classes = useStyles()
  const [currentPage, setCurrentPage] = useState(1)
  const [openJobModal, setOpenJobModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(initialValueSelectedJob)
  const [applies, setApplies] = useState<FetchApplies[]>([])

  const jobsListRef = useRef<null | HTMLDivElement>(null)

  const numberOfPages = jobsList.length && Math.ceil(jobsList.length / perPage)

  const handleCurrentPage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)

    setSelectedJob(jobsList[perPage * (value - 1)])

    jobsListRef.current?.scroll(0, 0)
  }

  const fetchSelectedJob = async (id: string) => {
    const selectedJob = jobsList.filter((job) => job.uuid === id)[0]
    setSelectedJob(selectedJob)

    setOpenJobModal(true)
  }

  const fetchUserData = async () => {
    const accessToken = sessionStorage.getItem('accessToken')

    const userApplies = await fetchAppliesService(accessToken!)

    const { response } = userApplies
    if (response) setApplies(response)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <Box
      className={classes.jobsList}
      ref={jobsListRef}
      paddingX={{ xs: 2, sm: 4, md: 10, lg: 30 }}
    >
      <SkeletonHOC
        variant="rectangular"
        animation="wave"
        isLoading={isFetching}
        height={232}
      >
        <>
          {jobsList.length > 0 &&
            jobsList
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
      {!isFetching &&
        (jobsList.length > 0 ? (
          <Pagination
            count={numberOfPages}
            color="primary"
            onChange={handleCurrentPage}
          />
        ) : (
          <NoData
            size={280}
            title="Nenhuma vaga favoritada"
            link="/jobs"
            linkText="favorite uma"
          />
        ))}

      <JobDetailsModal
        favoritePage
        setJobsList={setJobsList}
        applies={applies}
        open={openJobModal}
        setOpen={setOpenJobModal}
        selectedJob={selectedJob}
        isFetching={isFetching}
      />
    </Box>
  )
}

export default FavoriteJobsList
