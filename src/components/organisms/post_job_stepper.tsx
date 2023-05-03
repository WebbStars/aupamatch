import { Box, Button, Step, StepLabel, Stepper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from '../../store'
import { setErrorMessage } from '../../store/notifications'
import FormPaper from './job_form/form_paper'
import { editJob, postJob } from '../../services'
import { MessageModal } from '../molecules'
import { useNavigate } from 'react-router-dom'

const steps = [
  {
    label: '1° step',
  },
  {
    label: '2° step',
  },
  {
    label: '3° step',
  },
  {
    label: '4° step',
  },
]

const INITIAL_VALUES = {
  titulo_vaga: '',
  data_disponibilidade: new Date().toLocaleDateString('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
  vaga_patrocinada: 'false',
  pais: '',
  estado_provincia: '',
  nacionalidade: '',
  quantidade_criancas: 0,
  numero_identificacao_nacional: '',
  religiao: '',
  carro_exclusivo: 'false',
  idiomas: [],
  faixa_etaria: '',
  experiencia_trabalho: '',
  habilitacao: 'false',
  escolaridade: '',
  natacao: 'false',
  resumo: '',
  descricao: '',
  genero: 'No Preference',
  habilitacao_pid: 'false',
  passaporte: 'false',
  receber_newsletter: 'false',
}

interface Props {
  jobToEdit?: any
  isEdit?: boolean
}

const PostJobStepper: React.FC<Props> = ({ isEdit, jobToEdit }) => {
  const { t } = useTranslation()
  const [isFetchingEdit, setIsFetchingEdit] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalStatus, setModalStatus] = useState('')
  const [activeStep, setActiveStep] = React.useState(0)
  const [form, setForm] = useState(INITIAL_VALUES)
  const navigate = useNavigate()

  useEffect(() => {
    if (!jobToEdit) return

    setForm(jobToEdit)
    if (form !== INITIAL_VALUES) setIsFetchingEdit(false)
  }, [jobToEdit])

  const dispatch = useDispatch()
  const accessToken = sessionStorage.getItem('accessToken')

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const newForm = {
      ...form,
      vaga_patrocinada: isEdit
        ? form?.vaga_patrocinada
        : JSON.parse(form.vaga_patrocinada),
      carro_exclusivo: isEdit
        ? form?.carro_exclusivo
        : JSON.parse(form.carro_exclusivo),
      habilitacao: isEdit ? form.habilitacao : JSON.parse(form.habilitacao),
      natacao: isEdit ? form.natacao : JSON.parse(form.natacao),
      passaporte: isEdit ? form.passaporte : JSON.parse(form.passaporte),
      receber_newsletter: isEdit
        ? form.receber_newsletter
        : JSON.parse(form.receber_newsletter),
    }

    const { hasError } = isEdit
      ? await editJob(newForm as any, accessToken!)
      : await postJob(newForm as any, accessToken!)

    if (hasError) {
      dispatch(
        setErrorMessage(
          `Erro ao tentar ${isEdit ? 'editar' : 'cadastrar'} vaga`
        )
      )
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

  const handleNextForm = (
    e: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    e.preventDefault()

    if (index !== 3) setActiveStep(activeStep + 1)
    else handleSubmitForm(e)
  }

  return (
    <Box display="flex" flexDirection="column" gap={4} mt={4}>
      <Stepper
        activeStep={activeStep}
        sx={{ height: { xs: '100px', md: 'auto' } }}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <FormPaper
        isFetchingEdit={isFetchingEdit}
        isEdit={isEdit}
        isLoading={isLoading}
        submitLabel={
          activeStep === steps.length - 1
            ? t('organisms.post_job_stepper.finish')
            : t('organisms.post_job_stepper.next')
        }
        handleSubmit={(e) => handleNextForm(e, activeStep)}
        handlePrevious={() => setActiveStep(activeStep - 1)}
        activeStep={activeStep}
        form={form}
        setForm={setForm}
      />

      <MessageModal
        success={modalStatus === 'success'}
        error={modalStatus === 'error'}
        open={openModal}
        setOpen={setOpenModal}
        title={t('organisms.post_job_stepper.modal_title')}
        subtitle={t('organisms.post_job_stepper.modal_subtitle')!}
        handleSubmit={() => navigate('/search_aupair')}
        secondaryButton={
          <Button
            onClick={() => navigate('/my_jobs')}
            color="inherit"
            variant="contained"
          >
            {t('organisms.post_job_stepper.my_jobs')}
          </Button>
        }
      />
    </Box>
  )
}

export default PostJobStepper
