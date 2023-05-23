import { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, Pagination } from '@mui/material'
import { SkeletonHOC } from '../atoms'
import { JobDetailsModal } from '../organisms'
import OpportunityCard from './opportunity_card'
import { deleteJob, removeApply } from '../../services'
import { setErrorMessage, setSuccessMessage } from '../../store/notifications'
import { useDispatch } from '../../store'
import { AppliesList } from '../pages/my_applies'
import { notFound } from '../../images'

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
  appliesList: AppliesList[]
  perPage: number
  isFetching: boolean
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
  views?: boolean
  setAppliesList: React.Dispatch<React.SetStateAction<AppliesList[]>>
}

const initialValueSelectedJob = {
  uuid: '',
  title: '',
  description: '',
  tags: [],
}

const MyAppliesList: React.FC<Props> = ({
  appliesList,
  perPage,
  isFetching,
  setIsFetching,
  setAppliesList,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [currentPage, setCurrentPage] = useState(1)
  const [openJobModal, setOpenJobModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(initialValueSelectedJob)
  const accessToken = sessionStorage.getItem('accessToken')

  const jobsListRef = useRef<null | HTMLDivElement>(null)

  const numberOfPages =
    appliesList.length && Math.ceil(appliesList.length / perPage)

  const handleCurrentPage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)

    setSelectedJob(appliesList[perPage * (value - 1)])

    jobsListRef.current?.scroll(0, 0)
  }

  const fetchSelectedJob = async (id: string) => {
    const selectedJob = appliesList.filter((job) => job.uuid === id)[0]
    setSelectedJob(selectedJob)

    setOpenJobModal(true)
  }

  const handleDelete = async (jobId: string) => {
    if (!accessToken) return

    const { hasError } = await deleteJob(accessToken, jobId)

    if (!hasError) {
      setAppliesList((jobs) => jobs.filter((job) => job.uuid !== jobId))
      dispatch(setSuccessMessage('Vaga removida com sucesso'))

      return
    }

    dispatch(setErrorMessage('Erro ao tentar remover vaga'))
  }

  const handleRemoveApply = async (jobId: string) => {
    if (!accessToken) return

    setIsFetching(true)

    const { hasError } = await removeApply(jobId, accessToken)

    setIsFetching(false)

    if (!hasError) {
      setAppliesList((jobs) => jobs.filter((job) => job.uuid !== jobId))
      dispatch(setSuccessMessage('Candidatura cancelada com sucesso'))

      return
    }

    setIsFetching(false)
    dispatch(setErrorMessage('Erro ao tentar cancelar candidatura'))
  }

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
          {appliesList.length > 0 &&
            appliesList
              .slice(perPage * (currentPage - 1), perPage * currentPage)
              .map((job, index) => (
                <OpportunityCard
                  key={job.uuid + index}
                  job={job}
                  applies
                  onClick={() => fetchSelectedJob(job.uuid)}
                  selected={selectedJob?.uuid === job.uuid}
                  onDelete={() => handleDelete(job.uuid)}
                />
              ))}
        </>
      </SkeletonHOC>

      {!isFetching &&
        (appliesList.length > 0 ? (
          <Pagination
            count={numberOfPages}
            color="primary"
            onChange={handleCurrentPage}
          />
        ) : (
          <Box display="flex" flexDirection="column" justifyContent="center">
            <img
              src={notFound}
              alt={'nada encontrado'}
              height={600}
              width={600}
              style={{ alignSelf: 'center' }}
            />
          </Box>
        ))}

      <JobDetailsModal
        wasApplied={true}
        handleRemoveApply={handleRemoveApply}
        open={openJobModal}
        setOpen={setOpenJobModal}
        selectedJob={selectedJob}
        isFetching={isFetching}
      />
    </Box>
  )
}

export default MyAppliesList
