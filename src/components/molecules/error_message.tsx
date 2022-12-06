import React, { ReactElement } from 'react'
import { Typography, Theme } from '@mui/material'
import { makeStyles } from '@material-ui/styles'
import { Trans } from 'react-i18next'
import { ErrorOutlineOutlined } from '@mui/icons-material'
import { theme } from '../../styles'

interface Style {
  isWarning?: boolean
}

interface Props {
  message: string
  isWarning?: boolean
  transComponents?: ReactElement[]
}

const useStyles = makeStyles<Theme, Style>({
  icon: {
    marginRight: 8,
    filter: ({ isWarning }) =>
      isWarning ? 'invert(.5) sepia(1) saturate(5) hue-rotate(175deg)' : ''
  },
  alertError: {
    whiteSpace: 'pre-wrap',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-8px',
    color: ({ isWarning }) =>
      isWarning ? theme.palette.primary.light : theme.palette.error.main
  }
})

const ErrorMessage: React.FC<Props> = ({
  message,
  isWarning,
  transComponents
}) => {
  const classes = useStyles({ isWarning })
  return (
    <Typography className={classes.alertError} fontSize="13px">
      <ErrorOutlineOutlined fontSize="small" />
      <Trans defaults={message} components={transComponents} />
    </Typography>
  )
}

export default ErrorMessage
