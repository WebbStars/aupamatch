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
import PhoneInput from 'react-phone-input-2'
import { FetchUserState } from '../../../services'

type Object = { [key: string]: any }

interface Props {
  form: Object
  setForm: Dispatch<SetStateAction<any>>
  handleOnChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<any>
  ) => void
  user: FetchUserState | null
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

    console.log(formatedDate)

    setForm((oldForm: Object) => ({ ...oldForm, [name]: formatedDate }))
  }

  const handleChangePhone = (newValue: string) => {
    setForm((oldForm: Object) => ({ ...oldForm, telefone: newValue }))
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} textAlign="justify">
      <FormControl>
        <FormLabel>Nome completo</FormLabel>
        <TextField
          defaultValue={user?.name}
          name="nome_completo"
          variant="outlined"
          placeholder="Nome completo"
          value={form.titulo_vaga}
          onChange={handleOnChange}
        />
      </FormControl>
      <FormControl>
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

      <FormControl>
        <FormLabel>Identificação</FormLabel>
        <TextField
          name="identificacao"
          variant="outlined"
          placeholder="Identificação"
          value={form.titulo_vaga}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl fullWidth>
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

      <FormControl fullWidth>
        <FormLabel>Telefone</FormLabel>
        <PhoneInput
          specialLabel=""
          country={'br'}
          value={form.phone}
          onChange={(e) => handleChangePhone(e)}
          inputStyle={{
            width: '100%',
          }}
        />
      </FormControl>
    </Box>
  )
}
export default EditAupairForm1
