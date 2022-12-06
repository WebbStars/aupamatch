import {
  Box,
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from '../../store'
import { setErrorMessage } from '../../store/notifications'
import FormPaper from './aupair_data_form/form_paper'
import { editAupair } from '../../services'
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
]

const INITIAL_VALUES = {
  telefone: '',
  cep: '',
  logradouro: '',
  numero: '',
  cidade: '',
  estado: '',
  data_de_nascimento: new Date(),
  genero: '',
  cpf: '',
  nacionalidade: '',
  resumo: '',
  idioma: '',
  passaporte: '',
  quantidade_criancas: 0,
  carro_exclusivo: 'false',
  receber_newsletter: 'false',
  data_disponibilidade: new Date(),
  escolaridade: '',
  experiencia: '',
  natacao: 'false',
  habilitacao: 'false',
}

const EditAupairStepper: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalStatus, setModalStatus] = useState('')
  const [activeStep, setActiveStep] = React.useState(0)
  const [form, setForm] = useState(INITIAL_VALUES)

  const dispatch = useDispatch()
  const accessToken = sessionStorage.getItem('accessToken')

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newForm = {
      ...form,
      carro_exclusivo: JSON.parse(form.carro_exclusivo),
      habilitacao: JSON.parse(form.habilitacao),
      natacao: JSON.parse(form.natacao),
      receber_newsletter: JSON.parse(form.receber_newsletter),
    }

    setIsLoading(true)
    const { hasError } = await editAupair(newForm as any, accessToken!)

    if (hasError) {
      dispatch(setErrorMessage('Erro ao cadastrar informações'))
      setModalStatus('error')
      setIsLoading(false)
      return
    }

    setForm(INITIAL_VALUES)
    setModalStatus('success')
    setOpenModal(true)
    setIsLoading(false)
    localStorage.setItem('notFirstLogin', 'true')
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
    <Box display="flex" flexDirection="column" gap={4}>
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
        handleSubmit={() => navigate('/jobs')}
        success={modalStatus === 'success'}
        error={modalStatus === 'error'}
        open={openModal}
        setOpen={setOpenModal}
        title="Obrigada por concluir seu cadastro!"
        subtitle="Fique de olho na caixa do seu e-mail."
        secondaryButton={
          <Tooltip title={t('global.disabled')}>
            <Button
              onClick={() => {}}
              color="inherit"
              variant="contained"
              disabled
            >
              {isLoading ? (
                <CircularProgress size="22px" color="secondary" />
              ) : (
                t('organisms.post_job_stepper.my_jobs')
              )}
            </Button>
          </Tooltip>
        }
      />
    </Box>
  )
}

export default EditAupairStepper
