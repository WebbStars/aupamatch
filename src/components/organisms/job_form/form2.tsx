import React from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { useTranslation } from 'react-i18next'

type Object = { [key: string]: any }

interface Props {
  form: Object
  handleOnChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<any>
  ) => void
}

const NewJobForm2: React.FC<Props> = ({ form, handleOnChange }) => {
  const { t } = useTranslation()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={3}
      textAlign="justify"
      mt={6}
    >
      <FormControl>
        <FormLabel required>
          {t('organisms.job_form.form2.nationality_label')}
        </FormLabel>
        <TextField
          name="nacionalidade"
          variant="outlined"
          required
          value={form.nacionalidade}
          placeholder={t('organisms.job_form.form2.nationality_placeholder')!}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form2.children_number')}</FormLabel>
        <TextField
          type="number"
          name="quantidade_criancas"
          value={form.quantidade_criancas}
          placeholder={
            t('organisms.job_form.form2.children_number_placeholder')!
          }
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form2.owner_job_id')}</FormLabel>
        <TextField
          name="numero_identificacao_nacional"
          value={form.numero_identificacao_nacional}
          placeholder={t('organisms.job_form.form2.owner_job_id_placeholder')!}
          onChange={handleOnChange}
          required
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form2.religion')}</FormLabel>
        <TextField
          name="religiao"
          value={form.religiao}
          placeholder={t('organisms.job_form.form2.religion_placeholder')!}
          onChange={handleOnChange}
          required
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form2.exclusive_car')}</FormLabel>
        <Select
          value={form.carro_exclusivo}
          name="carro_exclusivo"
          placeholder={t('organisms.job_form.form2.exclusive_car_placeholder')!}
          onChange={handleOnChange}
        >
          <MenuItem value="true">{t('global.yes')}</MenuItem>
          <MenuItem value="false">{t('global.no')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
export default NewJobForm2
