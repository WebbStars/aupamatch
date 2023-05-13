import { makeStyles } from '@material-ui/styles'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { companyDefaultImage } from '../../images'
import {
  applyJob,
  favoriteJob,
  fetchAppliesService,
  FetchAupairJobState,
} from '../../services'
import { useSelector } from '../../store'
import { theme } from '../../styles'
import { CopyButton, CustomButton, SkeletonHOC } from '../atoms'
import { MessageModal } from '../molecules'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  jobPaper: {
    padding: 28,
    borderRadius: 10,
    height: 'min-content',
    maxHeight: 'auto',
  },
  urlButton: {
    borderRadius: '3px',
    height: 48,
    backgroundColor: theme.palette.grey[100],
    padding: '10px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  url: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

interface Job {
  job?: FetchAupairJobState
  uuid: string
  title: string
  description: string
  tags: string[]
}

interface Props {
  selectedJob: Job
  isFetching: boolean
  wasApplied: boolean
}

const JobDetails: React.FC<Props> = ({
  selectedJob,
  isFetching,
  // wasApplied = false
}) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const jobs = useSelector((state) => state.jobs)
  const [openModal, setOpenModal] = useState(false)
  const [favoritesJobs, setFavoritesJobs] = useState<string[]>([])
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const [modalStatus, setModalStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [titles, setTitles] = useState({
    title: t('organisms.job_details.modal_title'),
    subTitle: t('organisms.job_details.modal_subtitle'),
  })
  const [modalButton, setModalButton] = useState({
    redirectPath: '/my_profile',
    textButton: t('organisms.job_details.my_profile'),
  })

  const accessToken = sessionStorage.getItem('accessToken')

  useEffect(() => {
    const assyncEffect = async () => {
      if (!accessToken) return

      let initialIds: string[] = []

      if (jobs) {
        jobs.map((job) => {
          if (job.isSaved) initialIds.push(job._id)
        })
        setFavoritesJobs(initialIds)
      }
    }

    assyncEffect()
  }, [jobs])

  const submitJob = async () => {
    setIsLoading(true)

    const payload = {
      jobId: selectedJob.uuid,
      aupairId: user?._id!,
      accessToken: accessToken!,
    }

    const { hasError } = await applyJob(payload)
    if (hasError) {
      setModalStatus('error')
      setOpenModal(true)
      return
    }
    setOpenModal(true)
    setModalStatus('success')

    await fetchAppliesService(accessToken!)
    setIsLoading(false)
  }

  const toFavoriteJob = async () => {
    setIsLoadingFavorite(true)
    const { hasError } = await favoriteJob(selectedJob.uuid, accessToken!)
    let favsIds: string[] = favoritesJobs

    if (hasError) {
      setModalStatus('error')
      setTitles({
        title: 'Erro ao favoritar vaga!', //desfavoritar tbm
        subTitle: '',
      })

      setOpenModal(true)
      setIsLoadingFavorite(false)

      return
    }

    if (favsIds.includes(selectedJob.uuid)) {
      setTitles({
        title: 'Vaga desfavoritada com sucesso!',
        subTitle: 'Você pode verificar suas vagas favoritas',
      })
      favsIds = favoritesJobs.filter((id) => id !== selectedJob.uuid)
    } else {
      setTitles({
        title: 'Vaga favoritada com sucesso!',
        subTitle: 'Você pode verificar suas vagas favoritas',
      })
      favsIds.push(selectedJob.uuid)
    }

    setFavoritesJobs(favsIds)
    setIsLoadingFavorite(false)
    setModalStatus('success')
    setModalButton({ textButton: 'Favoritas', redirectPath: '/favorite_jobs' })
    setOpenModal(true)
  }

  const isFavorite = favoritesJobs.includes(selectedJob.uuid)

  return (
    <Paper className={classes.jobPaper}>
      <Box display="flex" width="100%" justifyContent="space-between">
        <Box display="flex" gap={3}>
          <Box>
            <img src={companyDefaultImage} alt="company image" width={56} />
          </Box>
          <Box>
            <Typography fontSize={16} color={theme.palette.grey[600]}>
              {t('organisms.job_details.new_user')}
            </Typography>
            <SkeletonHOC
              animation="wave"
              variant="text"
              isLoading={isFetching}
              height={28}
            >
              <Typography
                fontSize={18}
                fontWeight="bold"
                color={theme.palette.common.black}
              >
                {selectedJob?.title}
              </Typography>
            </SkeletonHOC>
          </Box>
        </Box>

        {isLoadingFavorite && (
          <Box padding="12px">
            <CircularProgress size={32} />
          </Box>
        )}

        {!isLoadingFavorite && (
          <Tooltip title={isFavorite ? 'Desfavoritar' : 'Favoritar'}>
            <IconButton
              onClick={() => toFavoriteJob()}
              style={{ width: 56, height: 56 }}
            >
              {isFavorite ? (
                <Favorite fontSize="large" color="primary" />
              ) : (
                <FavoriteBorder fontSize="large" color="disabled" />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box display="flex" flexDirection="column" gap={1} mt={6}>
        <Typography
          fontSize={16}
          fontWeight="bold"
          color={theme.palette.common.black}
        >
          {t('organisms.job_details.overview')}
        </Typography>

        <SkeletonHOC animation="wave" variant="text" isLoading={isFetching}>
          <Typography fontSize={12} color={theme.palette.grey[700]}>
            {selectedJob?.description}
          </Typography>
        </SkeletonHOC>
      </Box>

      <Box display="flex" flexDirection="column" gap={1} mt={3}>
        <Typography
          fontSize={16}
          fontWeight="bold"
          color={theme.palette.common.black}
        >
          {t('organisms.job_details.job_details')}
        </Typography>
      </Box>
      <Box display="flex" gap={2} mt={1}>
        <SkeletonHOC
          animation="wave"
          variant="rounded"
          height={32}
          width={75}
          isLoading={isFetching}
        >
          <>
            {selectedJob?.tags.map((tag: string, index) => {
              return (
                tag && (
                  <Chip
                    key={index}
                    label={tag}
                    variant="outlined"
                    sx={{
                      borderRadius: '3px',
                      backgroundColor: theme.palette.grey[300],
                      border: 'none',
                    }}
                  />
                )
              )
            })}
          </>
        </SkeletonHOC>
      </Box>

      <Box display="flex" flexDirection="column" gap={1} mt={7}>
        {/* <Typography
          fontSize={16}
          fontWeight="bold"
          color={theme.palette.common.black}
        >
          {t('organisms.job_details.profile_detail')}
        </Typography> */}

        {/* <Box display="flex" width="100%" justifyContent="space-between">
          <Box textAlign="justify">
            <Typography
              fontSize={14}
              fontWeight="bold"
              color={theme.palette.common.black}
            >
              5.00 para 1 avaliação
            </Typography>

            <Box>
              <Star color="warning" fontSize="inherit" />
              <Star color="warning" fontSize="inherit" />
              <Star color="warning" fontSize="inherit" />
              <Star color="warning" fontSize="inherit" />
            </Box>
          </Box>

          <Box textAlign="justify">
            <Typography
              fontSize={14}
              fontWeight="bold"
              color={theme.palette.common.black}
            >
              {t('organisms.job_details.locale')}
            </Typography>
            <Typography fontSize={12} color={theme.palette.grey[600]}>
              Estados Unidos
            </Typography>
          </Box>

          <Box textAlign="justify">
            <Typography
              fontSize={14}
              fontWeight="bold"
              color={theme.palette.common.black}
            >
              {t('organisms.job_details.timeline')}
            </Typography>
            <Typography fontSize={12} color={theme.palette.grey[600]}>
              Somente na Semana
            </Typography>
          </Box>
        </Box> */}

        <Box width="100%">
          <SkeletonHOC
            animation="wave"
            variant="text"
            height={40}
            width="100%"
            isLoading={isFetching}
          >
            <CustomButton width="100%" height="48px" onClick={submitJob}>
              {isLoading ? (
                <CircularProgress size="18px" color="secondary" />
              ) : (
                `Você tem ${selectedJob?.job?.score} de compatibilidade com essa vaga! Se candidate!`
              )}

              {/* {wasApplied
              ? 'Cancelar candidatura'
              : t('organisms.job_details.apply')} */}
            </CustomButton>
          </SkeletonHOC>
        </Box>

        <Box display="grid" gridTemplateColumns="8fr 2fr" width="100%" mt={4}>
          <Box className={classes.urlButton}>
            <Box className={classes.url}>
              <Typography
                fontSize={12}
                color={theme.palette.grey[700]}
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                https://aupamatch.com.br/vaga/abcdefghijklmopqrstuvwxyz1234567891011121314151617181920212223242526272829303132
              </Typography>
            </Box>
            <CopyButton
              value={
                'https://aupamatch.com.br/vaga/abcdefghijklmopqrstuvwxyz1234567891011121314151617181920212223242526272829303132'
              }
            />
          </Box>

          <CustomButton width="100%" height="48px" onClick={submitJob}>
            {isLoading ? (
              <CircularProgress size="18px" color="secondary" />
            ) : (
              t('organisms.job_details.apply')
            )}

            {/* {wasApplied
              ? 'Cancelar candidatura'
              : t('organisms.job_details.apply')} */}
          </CustomButton>
        </Box>
      </Box>

      <MessageModal
        success={modalStatus === 'success'}
        error={modalStatus === 'error'}
        open={openModal}
        setOpen={setOpenModal}
        title={titles.title}
        subtitle={titles.subTitle}
        secondaryButton={
          <Button
            onClick={() => navigate(modalButton.redirectPath)}
            variant="contained"
            color="secondary"
          >
            {modalButton.textButton}
          </Button>
        }
      />
    </Paper>
  )
}

export default JobDetails
