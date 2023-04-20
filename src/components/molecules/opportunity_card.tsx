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
import { FetchAupairJobState } from '../../services'
import { theme } from '../../styles'
import { Delete, Edit, Lock } from '@mui/icons-material'
import MessageModal from './message_modal'

interface Job {
  job: FetchAupairJobState
  uuid: string
  title: string
  description: string
  tags: (string | false)[]
  tagsResume: (string | false)[]
}

interface Props {
  job: Job
  onClick: () => void
  onDelete?: () => void
  selected: boolean
  views?: boolean
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
})

const OpportunityCard: React.FC<Props> = ({
  selected,
  job,
  onClick,
  onDelete,
  views,
}) => {
  const classes = useStyles({ selected })
  const { t } = useTranslation()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleOpenDeleteModal = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()

    setOpenDeleteModal(true)
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
              <IconButton onClick={handleOpenDeleteModal} title="Excluir">
                <Delete />
              </IconButton>
              <IconButton disabled>
                <Edit />
              </IconButton>
              <IconButton disabled>
                <Lock />
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
      </Box>
      <MessageModal
        title="Tem certeza que deseja excluir essa vaga?"
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
