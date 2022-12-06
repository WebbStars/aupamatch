import { Box, Step, StepLabel, Stepper } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormPaper from './job_form/form_paper'

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.'
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  }
]

const PostJobStepper: React.FC = () => {
  const { t } = useTranslation()

  const [activeStep, setActiveStep] = React.useState(0)

  const [form, setForm] = useState({
    titulo_vaga: '',
    data_disponibilidade: null,
    vaga_patrocinada: false,
    pais: '',
    estado_provincia: '',
    nacionalidade: '',
    quantidade_criancas: null,
    numero_identificacao_nacional: null,
    religiao: '',
    carro_exclusivo: false,
    idioms: [],
    escolaridade: '',
    natacao: false,
    resumo: '',
    descricao_vaga: '',
    faixa_etaria: '',
    genero: '',
    experiencia_trabalho: '',
    pid: false,
    passaporte: false,
    receber_newsletter: false
  })

  const handleSubmitForm = (index: number) => {
    if (index !== 3) setActiveStep(activeStep + 1)
    else console.log(form)
  }

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Stepper
        activeStep={activeStep}
        sx={{ height: { xs: '100px', md: 'auto' } }}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{`${index + 1} step`}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <FormPaper
        submitLabel={
          activeStep === steps.length - 1
            ? t('organisms.post_job_stepper.finish')
            : t('organisms.post_job_stepper.next')
        }
        handleSubmit={() => handleSubmitForm(activeStep)}
        handlePrevious={() => setActiveStep(activeStep - 1)}
        activeStep={activeStep}
        form={form}
        setForm={setForm}
      />
    </Box>
  )
}

export default PostJobStepper
