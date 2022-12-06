import React, { Dispatch, SetStateAction } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useTranslation } from 'react-i18next'

type Object = { [key: string]: any }

interface Props {
  form: Object
  setForm: Dispatch<SetStateAction<any>>
  handleOnChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<any>
  ) => void
}

const NewJobForm1: React.FC<Props> = ({ form, handleOnChange, setForm }) => {
  const { t } = useTranslation()

  const handleChangeData = (name: string, newValue: any) => {
    const newDate = new Date(newValue)

    const formatedDate = newDate.toLocaleDateString('pt', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

    setForm((oldForm: Object) => ({ ...oldForm, [name]: formatedDate }))
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} textAlign="justify">
      <FormControl>
        <FormLabel required>
          {t('organisms.job_form.form1.title_label')}
        </FormLabel>
        <TextField
          name="titulo_vaga"
          variant="outlined"
          required
          placeholder={t('organisms.job_form.form1.title_placeholder')!}
          value={form.titulo_vaga}
          onChange={handleOnChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>{t('organisms.job_form.form1.date_label')}</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputFormat="DD/MM/YYYY"
            value={form.data_disponibilidade}
            onChange={(event) =>
              handleChangeData('data_disponibilidade', event)
            }
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form1.sponsor_label')}</FormLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={form.vaga_patrocinada}
          name="vaga_patrocinada"
          placeholder={t('organisms.job_form.form1.sponsor_placeholder')!}
          onChange={handleOnChange}
        >
          <MenuItem value="true">{t('global.yes')}</MenuItem>
          <MenuItem value="false">{t('global.no')}</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form1.country_label')}</FormLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={form.pais}
          name="pais"
          onChange={handleOnChange}
        >
          <MenuItem value={'br'}>BR</MenuItem>
          <MenuItem value={'usa'}>USA</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form1.state_label')}</FormLabel>
        <TextField
          name="estado_provincia"
          variant="outlined"
          placeholder={t('organisms.job_form.form1.state_placeholder')!}
          required
          value={form.estado_provincia}
          onChange={handleOnChange}
        />
      </FormControl>
    </Box>
  )
}
export default NewJobForm1
