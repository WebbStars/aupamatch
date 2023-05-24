import {
  Box,
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from '../../store'
import { setErrorMessage, setSuccessMessage } from '../../store/notifications'
import FormPaper from './aupair_data_form/form_paper'
import { editAupair } from '../../services'
import { MessageModal } from '../molecules'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../utils'
import { editAupairProfile } from '../../services/edit_aupair_profile'

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
  data_de_nascimento: '',
  genero: '',
  cpf: '',
  nacionalidade: '',
  numero_identificacao_nacional: '',
  tipo_documento: '',
  resumo: '',
  idioma: '',
  passaporte: '',
  quantidade_criancas: 0,
  carro_exclusivo: 'false',
  receber_newsletter: 'false',
  data_disponibilidade: '',
  escolaridade: '',
  experiencia_trabalho: '',
  natacao: 'false',
  habilitacao: 'false',
}

const EditAupairStepper: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalStatus, setModalStatus] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [form, setForm] = useState(INITIAL_VALUES)

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const accessToken = sessionStorage.getItem('accessToken')

  const logged = JSON.parse(sessionStorage.getItem('logged') || 'false')

  useEffect(() => {
    if (!user) return

    const { data_de_nascimento, data_disponibilidade } = user

    const formattedBirthDay = new Date(data_de_nascimento).toLocaleDateString(
      'en',
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
    )
    const formattedAvaiable = new Date(data_disponibilidade).toLocaleDateString(
      'en',
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
    )

    const newUser = {
      ...user,
      data_de_nascimento: formattedBirthDay,
      data_disponibilidade: formattedAvaiable,
    }

    setForm(newUser as any)
  }, [user])

  function isDate18orMoreYearsOld(day: number, month: number, year: number) {
    return new Date(year + 18, month - 1, day) <= new Date()
  }

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

    const { hasError } = logged
      ? await editAupairProfile(newForm as any, accessToken!)
      : await editAupair(newForm as any, accessToken!)

    const { data_de_nascimento } = form
    const [month, day, year] = data_de_nascimento.split('/')

    if (!isDate18orMoreYearsOld(Number(day), Number(month), Number(year))) {
      dispatch(
        setErrorMessage(
          'É necessário ter 18 anos ou mais para finalizar o cadastro!'
        )
      )
      logout()
      return navigate('/')
    }

    if (hasError) {
      dispatch(setErrorMessage('Erro ao cadastrar informações'))
      setModalStatus('error')
      setIsLoading(false)
      return
    }

    if (logged) {
      dispatch(setSuccessMessage('Informações registradas com sucesso'))
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

    if (index !== 2) setActiveStep(activeStep + 1)
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
          <Button
            onClick={() => navigate('/jobs')}
            color="inherit"
            variant="contained"
          >
            {isLoading ? (
              <CircularProgress size="22px" sx={{ color: 'secondary.light' }} />
            ) : (
              t('organisms.post_job_stepper.my_jobs')
            )}
          </Button>
        }
      />
    </Box>
  )
}

export default EditAupairStepper
