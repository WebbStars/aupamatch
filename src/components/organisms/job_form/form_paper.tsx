import { makeStyles } from '@material-ui/styles'
import {
  Box,
  Button,
  Paper,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { theme } from '../../../styles'
import NewJobForm1 from './form1'
import NewJobForm2 from './form2'
import NewJobForm3 from './form3'
import NewJobForm4 from './form4'

const useStyles = makeStyles({
  paper: {
    [theme.breakpoints.up('lg')]: {
      width: '900px',
      minHeight: '720px'
    },
    [theme.breakpoints.down('lg')]: {
      width: '600px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '350px'
    },
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,
    textAlign: 'center',
    padding: 40,
    mt: 20
  },
  buttons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 24
  }
})

type Object = { [key: string]: any }

interface Props {
  submitLabel: string
  handleSubmit: () => void
  handlePrevious: () => void
  activeStep: number
  form: Object
  setForm: Dispatch<SetStateAction<any>>
}

const FormPaper: React.FC<Props> = ({
  submitLabel,
  handleSubmit,
  handlePrevious,
  activeStep,
  form,
  setForm
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const handleOnChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<any>
  ) => {
    const { name, value } = event.target

    setForm((oldForm: Object) => ({ ...oldForm, [name]: value }))
  }

  const formToRender = () => {
    const props = {
      form: form,
      handleOnChange: handleOnChange,
      setForm: setForm
    }

    switch (activeStep) {
      case 0:
        return <NewJobForm1 {...props} />
      case 1:
        return <NewJobForm2 {...props} />
      case 2:
        return <NewJobForm3 {...props} />
      case 3:
        return <NewJobForm4 {...props} />
      default:
        return <NewJobForm1 {...props} />
    }
  }

  return (
    <Paper className={classes.paper} component="form" onSubmit={handleSubmit}>
      {activeStep === 0 && (
        <Box>
          <Typography variant="h3">
            {t('organisms.job_form.form_paper.title')}
          </Typography>
          <Typography variant="body2" color="#6C757D">
            {t('organisms.job_form.form_paper.subtitle')}
          </Typography>
        </Box>
      )}

      {formToRender()}

      <Box className={classes.buttons}>
        {activeStep !== 0 && (
          <Button color="secondary" variant="outlined" onClick={handlePrevious}>
            {t('organisms.job_form.form_paper.back_button')}
          </Button>
        )}

        <Button color="primary" variant="contained" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </Box>
    </Paper>
  )
}

export default FormPaper
