import React, { Dispatch, SetStateAction } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useTranslation } from 'react-i18next'
import RPI from 'react-phone-input-2'
import { FetchUserProfileState } from '../../../services'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PhoneInput = RPI.default || RPI

type Object = { [key: string]: any }

interface Props {
  form: Object
  setForm: Dispatch<SetStateAction<any>>
  handleOnChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<any>
  ) => void
  user: FetchUserProfileState | null
}

const EditAupairForm1: React.FC<Props> = ({
  form,
  handleOnChange,
  setForm,
  user,
}) => {
  const { t } = useTranslation()

  const handleChangeData = (name: string, newValue: any) => {
    const newDate = new Date(newValue)

    const formatedDate = newDate.toLocaleDateString('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    setForm((oldForm: Object) => ({ ...oldForm, [name]: formatedDate }))
  }
  const handleChangePhone = (newValue: string) => {
    setForm((oldForm: Object) => ({ ...oldForm, telefone: newValue }))
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} textAlign="justify">
      <FormControl required>
        <FormLabel>Nome completo</FormLabel>
        <TextField
          required
          defaultValue={user?.name}
          name="nome_completo"
          variant="outlined"
          placeholder="Nome completo"
          value={form.name}
          onChange={handleOnChange}
        />
      </FormControl>
      <FormControl required>
        <FormLabel>Data de Nascimento</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            views={['year', 'month', 'day']}
            inputFormat="DD/MM/YYYY"
            value={form.data_de_nascimento}
            onChange={(event) => handleChangeData('data_de_nascimento', event)}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth required>
        <FormLabel>Tipo de documento</FormLabel>
        <Select
          name="tipo_documento"
          value={form.tipo_documento}
          placeholder="Tipo de documento"
          onChange={handleOnChange}
        >
          <MenuItem value="CNH">CNH</MenuItem>
          <MenuItem value="RG">RG</MenuItem>
          <MenuItem value="CPF">CPF</MenuItem>
          <MenuItem value="SSN">SSN</MenuItem>
        </Select>
      </FormControl>

      <FormControl required>
        <FormLabel>Número do documento</FormLabel>
        <TextField
          required
          name="numero_identificacao_nacional"
          variant="outlined"
          placeholder="Número do documento"
          value={form.numero_identificacao_nacional}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl fullWidth required>
        <FormLabel>Gênero</FormLabel>
        <Select
          name="genero"
          value={form.genero}
          placeholder={t('organisms.job_form.form4.gender_placeholder')!}
          onChange={handleOnChange}
        >
          <MenuItem value="Masculino">{t('global.male')}</MenuItem>
          <MenuItem value="Feminino">{t('global.female')}</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <FormLabel>Telefone</FormLabel>
        <PhoneInput
          specialLabel=""
          country={'br'}
          onChange={(e: string) => handleChangePhone(e)}
          inputProps={{
            name: 'phone',
            required: true,
            autoFocus: true,
          }}
          inputStyle={{
            width: '100%',
          }}
        />
      </FormControl>
    </Box>
  )
}
export default EditAupairForm1
