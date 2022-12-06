import React from 'react'
import {
  Box,
  Chip,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
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

const languages = [
  'Mandarin',
  'Spanish',
  'English',
  'Hindi',
  'Arabic',
  'Portuguese',
  'Bengali',
  'Russian',
  'Japanese',
]

const NewJobForm3: React.FC<Props> = ({ form, handleOnChange }) => {
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
        <FormLabel>{t('organisms.job_form.form3.idiom_label')}</FormLabel>
        <Select
          multiple
          name="idioms"
          value={form.idioms}
          onChange={handleOnChange}
          renderValue={(selected: string[]) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {languages.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form3.schooling_label')}</FormLabel>
        <TextField
          name="escolaridade"
          value={form.escolaridade}
          placeholder={t('organisms.job_form.form3.schooling_placeholder')!}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form3.swimming_label')}</FormLabel>
        <Select
          name="natacao"
          value={form.natacao}
          placeholder={t('organisms.job_form.form3.swimming_placeholder')!}
          onChange={handleOnChange}
        >
          <MenuItem value="true">{t('global.yes')}</MenuItem>
          <MenuItem value="false">{t('global.no')}</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>
          {t('organisms.job_form.form3.family_resume_label')}
        </FormLabel>
        <TextField
          multiline
          name="resumo"
          value={form.resumo}
          placeholder={t('organisms.job_form.form3.family_resume_placeholder')!}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form3.description_label')}</FormLabel>
        <TextField
          multiline
          name="descricao"
          value={form.descricao}
          placeholder={t('organisms.job_form.form3.description_placeholder')!}
          onChange={handleOnChange}
        />
      </FormControl>
    </Box>
  )
}
export default NewJobForm3
