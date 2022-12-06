import React, { useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../../styles'
import { postJob } from '../../../services'
import { useDispatch } from '../../../store'
import { setErrorMessage } from '../../../store/notifications'
import { MessageModal } from '../../molecules'

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

interface PostJobPayload {
  escolaridade: string
  experiencia: string
  filhos: string
  descricao: string
  natacao: string
  carro: string
  habilitacao: string
}

const INITIAL_VALUES = {
  escolaridade: '',
  experiencia: '',
  filhos: '',
  descricao: '',
  natacao: 'false',
  carro: 'false',
  habilitacao: 'false'
}

const TemporaryForm: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()
  const accessToken = sessionStorage.getItem('accessToken')

  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalStatus, setModalStatus] = useState('')
  const [form, setForm] = useState(INITIAL_VALUES)

  const handleOnChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<any>
  ) => {
    const { name, value } = event.target
    let newValue = value

    if (name === 'filhos') JSON.stringify(newValue)

    setForm((oldForm: PostJobPayload) => ({
      ...oldForm,
      [name]: newValue
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newForm = {
      ...form,
      natacao: JSON.parse(form.natacao),
      carro: JSON.parse(form.carro),
      habilitacao: JSON.parse(form.habilitacao)
    }

    setIsLoading(true)
    const { hasError } = await postJob(newForm, accessToken!)

    if (hasError) {
      dispatch(setErrorMessage('Erro ao tentar cadastrar vaga'))
      setModalStatus('error')
      setOpenModal(true)
      setIsLoading(false)
      return
    }

    setForm(INITIAL_VALUES)
    setModalStatus('success')
    setOpenModal(true)
    setIsLoading(false)
  }

  return (
    <>
      <Paper className={classes.paper} component="form" onSubmit={handleSubmit}>
        <Box>
          <Typography variant="h3">
            {t('organisms.job_form.form_paper.title')}
          </Typography>
          <Typography variant="body2" color="#6C757D">
            {t('organisms.job_form.form_paper.subtitle')}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={3} textAlign="justify">
          <FormControl required>
            <FormLabel required>
              {t('organisms.job_form.temporary_form.schooling_label')}
            </FormLabel>
            <TextField
              required
              name="escolaridade"
              variant="outlined"
              value={form.escolaridade}
              placeholder={
                t('organisms.job_form.temporary_form.schooling_placeholder')!
              }
              disabled={isLoading}
              onChange={handleOnChange}
            />
          </FormControl>

          <FormControl fullWidth required>
            <FormLabel>
              {t('organisms.job_form.temporary_form.xp_label')}
            </FormLabel>
            <TextField
              required
              multiline
              name="experiencia"
              value={form.experiencia}
              placeholder={
                t('organisms.job_form.temporary_form.xp_placeholder')!
              }
              disabled={isLoading}
              onChange={handleOnChange}
            />
          </FormControl>

          <FormControl fullWidth required>
            <FormLabel>
              {t('organisms.job_form.temporary_form.children_label')}
            </FormLabel>
            <TextField
              required
              type="number"
              name="filhos"
              value={form.filhos}
              placeholder={
                t('organisms.job_form.temporary_form.children_placeholder')!
              }
              disabled={isLoading}
              onChange={handleOnChange}
            />
          </FormControl>

          <FormControl fullWidth required>
            <FormLabel>
              {t('organisms.job_form.form3.description_label')}
            </FormLabel>
            <TextField
              required
              multiline
              name="descricao"
              value={form.descricao}
              placeholder={
                t('organisms.job_form.form3.description_placeholder')!
              }
              disabled={isLoading}
              onChange={handleOnChange}
            />
          </FormControl>

          <Grid container spacing={1}>
            <Grid item xs={12} lg={4}>
              <FormControl fullWidth required>
                <FormLabel>
                  {t('organisms.job_form.form3.swimming_label')}
                </FormLabel>
                <Select
                  name="natacao"
                  value={form.natacao}
                  placeholder={
                    t('organisms.job_form.form3.swimming_placeholder')!
                  }
                  disabled={isLoading}
                  onChange={handleOnChange}
                >
                  <MenuItem value="true">{t('global.yes')}</MenuItem>
                  <MenuItem value="false">{t('global.no')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={4}>
              <FormControl fullWidth required>
                <FormLabel>
                  {t('organisms.job_form.form2.exclusive_car')}
                </FormLabel>
                <Select
                  name="carro"
                  value={form.carro}
                  placeholder={
                    t('organisms.job_form.form2.exclusive_car_placeholder')!
                  }
                  disabled={isLoading}
                  onChange={handleOnChange}
                >
                  <MenuItem value="true">{t('global.yes')}</MenuItem>
                  <MenuItem value="false">{t('global.no')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={4}>
              <FormControl fullWidth required>
                <FormLabel>
                  {t('organisms.job_form.temporary_form.cnh_label')}
                </FormLabel>
                <Select
                  required
                  name="habilitacao"
                  value={form.habilitacao}
                  placeholder={
                    t('organisms.job_form.temporary_form.cnh_label')!
                  }
                  disabled={isLoading}
                  onChange={handleOnChange}
                >
                  <MenuItem value="true">{t('global.yes')}</MenuItem>
                  <MenuItem value="false">{t('global.no')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.buttons}>
          <Button type="submit" color="primary" variant="contained">
            {isLoading ? (
              <CircularProgress size="22px" color="secondary" />
            ) : (
              t('organisms.post_job_stepper.finish')
            )}
          </Button>
        </Box>
      </Paper>
      <MessageModal
        success={modalStatus === 'success'}
        error={modalStatus === 'error'}
        open={openModal}
        setOpen={setOpenModal}
        title={t('organisms.post_job_stepper.modal_title')}
        subtitle={t('organisms.post_job_stepper.modal_subtitle')!}
        secondaryButton={
          <Tooltip title={t('global.disabled')}>
            <Button
              onClick={() => {}}
              color="inherit"
              variant="contained"
              disabled
            >
              {t('organisms.post_job_stepper.my_jobs')}
            </Button>
          </Tooltip>
        }
      />
    </>
  )
}
export default TemporaryForm
