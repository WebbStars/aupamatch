import React from 'react'
import { Button, CircularProgress, Grid } from '@mui/material'
import useStyles from './styles'

type buttonSubmit = {
  id?: string
  name?: string
  label?: string
  isHidden?: boolean
  'data-test'?: string
}

type buttonCancelDefault = {
  id?: string
  name?: string
  label?: string
  'data-test'?: string
  isHidden?: boolean
  handleCancel?: (event?: unknown, reason?: unknown) => void
}

interface Props {
  isLoading?: boolean | undefined
  buttonSubmit?: buttonSubmit
  buttonCancel?: buttonCancelDefault
  customButton?: React.ReactNode
}

const FormButtons: React.FC<Props> = ({
  isLoading,
  buttonSubmit,
  buttonCancel,
  customButton,
}) => {
  const classes = useStyles()

  return (
    <Grid
      container
      sx={classes.button}
      direction={{ xs: 'column-reverse', md: 'row' }}
    >
      {!buttonCancel?.isHidden && (
        <Button
          id={buttonCancel?.id}
          data-test={buttonCancel?.['data-test']}
          variant="text"
          disabled={isLoading}
          sx={!buttonSubmit?.isHidden ? classes.cancel : {}}
          onClick={() => buttonCancel?.handleCancel?.()}
        >
          {buttonCancel?.label}
        </Button>
      )}
      {customButton}
      {!buttonSubmit?.isHidden && (
        <Button
          id={buttonSubmit?.id}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
          data-test={buttonSubmit?.['data-test']}
          sx={classes.submit}
        >
          {buttonSubmit?.label}
          {isLoading && <CircularProgress size="16px" />}
        </Button>
      )}
    </Grid>
  )
}

export default FormButtons
