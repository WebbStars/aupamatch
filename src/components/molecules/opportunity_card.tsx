import { makeStyles } from '@material-ui/styles'
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Theme,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { companyDefaultImage } from '../../images'
import { FetchApplies, FetchAupairJobState, disableJob } from '../../services'
import { theme } from '../../styles'
import { Delete, Edit, Lock, LockOpen } from '@mui/icons-material'
import MessageModal from './message_modal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from '../../store'
import { setErrorMessage } from '../../store/notifications'

interface Job {
  job: FetchAupairJobState | FetchApplies
  uuid: string
  title: string
  description: string
  tags: (string | false)[]
  tagsResume: (string | false)[]
  status?: string
  dataCandidatura?: string
}

interface Props {
  job: Job
  onClick: () => void
  onDelete?: () => void
  selected: boolean
  views?: boolean
  applies?: boolean
}

export interface StyleProps {
  selected: boolean
}

const useStyles = makeStyles<Theme, StyleProps>({
  paper: {
    height: 232,
    width: '100%',
    display: 'flex',
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    gap: 24,
    marginBottom: 16,

    backgroundColor: (props) =>
      `${props.selected ? theme.palette.grey[300] : 'white'} !important`,
    boxShadow: 'none !important',
  },
  titleBox: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  titles: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  hiddenText: {
    width: '400px',
    height: '100%',
    maxHeight: '98px',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
  hiddenTitle: {
    width: '380px',
    whiteSpace: 'nowrap',
  },
  status: {
    color: 'primary.light',
  },
})

const OpportunityCard: React.FC<Props> = ({
  selected,
  job,
  onClick,
  onDelete,
  views,
  applies,
}) => {
  const classes = useStyles({ selected })
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [enabled, setEnabled] = useState(job.job.ativo)
  const accessToken = sessionStorage.getItem('accessToken')

  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const enableText = enabled
    ? t('molecules.opportunity_card.disable')
    : t('molecules.opportunity_card.enable')
  const enabledText = enabled
    ? t('molecules.opportunity_card.disabled')
    : t('molecules.opportunity_card.enabled')

  const handleOpenDeleteModal = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()

    setOpenDeleteModal(true)
  }

  const handleEditJob = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    navigate(`/edit_job/${job.job._id}`)
  }

  const handleDisableJob = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()

    const { hasError, response } = await disableJob(accessToken!, job.job._id)

    if (hasError) {
      dispatch(
        setErrorMessage(
          t('molecules.opportunity_card.disable_error', {
            enableText,
          })!
        )
      )
      return
    }

    dispatch(
      setErrorMessage(
        t('molecules.opportunity_card.disable_success', {
          enabledText,
        })!
      )
    )

    setEnabled(response.ativo)
  }

  return (
    <Paper className={classes.paper} onClick={onClick}>
      <Box display="flex" gap={3}>
        <Box>
          <img src={companyDefaultImage} alt="company image" width={64} />
        </Box>
        <Box className={classes.titleBox}>
          <Typography
            className={`${classes.titles} ${classes.hiddenTitle}`}
            fontWeight="bold"
          >
            {job.title}
          </Typography>
          <Typography className={`${classes.titles} ${classes.hiddenText}`}>
            {job.description}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          {job.tagsResume.map((tag) => {
            return (
              tag && (
                <Chip
                  key={tag.toString()}
                  label={tag}
                  variant="outlined"
                  sx={{
                    borderRadius: '3px',
                    backgroundColor: theme.palette.grey[300],
                    border: selected ? '.25px solid #6366F1' : 'none',
                  }}
                />
              )
            )
          })}
        </Box>

        {views && (
          <Box>
            <Stack direction="row" gap={2}>
              <IconButton
                onClick={handleOpenDeleteModal}
                title={t('molecules.opportunity_card.delete')!}
              >
                <Delete />
              </IconButton>
              <IconButton
                onClick={handleEditJob}
                title={t('molecules.opportunity_card.edit')!}
              >
                <Edit />
              </IconButton>
              <IconButton onClick={handleDisableJob} title={enableText}>
                {enabled ? <Lock /> : <LockOpen />}
              </IconButton>
            </Stack>
            <Box display="flex" gap={1}>
              <Typography fontSize="14px">
                {t('molecules.opportunity_card.views')}:
              </Typography>
              <Typography fontWeight="bold" fontSize="14px">
                {job.job.views}
              </Typography>
            </Box>
          </Box>
        )}
        {applies && (
          <Box display="flex" flexDirection="column" gap="8px">
            {/* <Stack direction="row" gap={0.4}>
              <Typography fontSize="11px" fontWeight="700" color="grey.600">
                Status:
              </Typography>{' '}
              <Typography
                color="primary.light"
                fontSize="11px"
                fontWeight="700"
                textTransform="capitalize"
              >
                {job.status}
              </Typography>
            </Stack> */}
            <Box display="flex" gap={1}>
              <Typography fontSize="14px">
                {t('molecules.opportunity_card.date_label')!}
              </Typography>
              <Typography fontWeight="bold" fontSize="14px">
                {job.dataCandidatura &&
                  new Date(job.dataCandidatura).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <MessageModal
        title={t('molecules.opportunity_card.delete_title')!}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        error
        handleSubmit={() => {
          onDelete && onDelete()
          setOpenDeleteModal(false)
        }}
      />
      {/* <Box>
        <Star color="warning" />
        <Star color="warning" />
        <Star color="warning" />
        <Star color="warning" />
      </Box> */}
    </Paper>
  )
}

export default OpportunityCard
