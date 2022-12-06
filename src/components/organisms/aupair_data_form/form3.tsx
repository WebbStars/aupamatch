import React from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
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

const NewJobForm3: React.FC<Props> = ({ form, handleOnChange }) => {
  const { t } = useTranslation()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={3}
      textAlign="justify"
      mt={2}
    >
      <FormControl>
        <FormLabel>Nacionalidade</FormLabel>
        <TextField
          name="nacionalidade"
          value={form.nacionalidade}
          placeholder="Nacionalidade"
          onChange={handleOnChange}
        />
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
        <FormLabel>Experiências profissionais</FormLabel>
        <TextField
          multiline
          name="experiencia"
          value={form.experiencia}
          placeholder="experiencias profissionais"
          onChange={handleOnChange}
        />
      </FormControl>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>
              {t('organisms.job_form.form3.swimming_label')}
            </FormLabel>
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
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Carro exclusivo</FormLabel>
            <Select
              name="carro_exclusivo"
              value={form.carro_exclusivo}
              placeholder="Considera necessário ter um carro exclusivo?"
              onChange={handleOnChange}
            >
              <MenuItem value="true">{t('global.yes')}</MenuItem>
              <MenuItem value="false">{t('global.no')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}
export default NewJobForm3
