import { makeStyles } from '@material-ui/styles'
import { Box, Chip, Paper, Theme, Typography } from '@mui/material'
import React from 'react'
import { companyDefaultImage } from '../../images'
import { FetchAupairJobState } from '../../services'
import { theme } from '../../styles'

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
  selected: boolean
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
    boxShadow: 'none !important'
  },
  titleBox: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  titles: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
})

const OpportunityCard: React.FC<Props> = ({ selected, job, onClick }) => {
  const classes = useStyles({ selected })
  return (
    <Paper className={classes.paper} onClick={onClick}>
      <Box display="flex" gap={3}>
        <Box>
          <img src={companyDefaultImage} alt="company image" width={64} />
        </Box>
        <Box className={classes.titleBox}>
          <Typography className={classes.titles} fontWeight="bold">
            {job.title}
          </Typography>
          <Typography className={classes.titles}>{job.description}</Typography>
        </Box>
      </Box>
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
                  border: selected ? '.25px solid #6366F1' : 'none'
                }}
              />
            )
          )
        })}
      </Box>
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
