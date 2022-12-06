import React from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
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

const NewJobForm4: React.FC<Props> = ({ form, handleOnChange }) => {
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
        <FormLabel>{t('organisms.job_form.form4.age_range_label')}</FormLabel>
        <TextField
          name="faixa_etaria"
          value={form.faixa_etaria}
          placeholder={t('organisms.job_form.form4.age_range_placeholder')!}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form4.gender_label')}</FormLabel>
        <Select
          name="genero"
          value={form.genero}
          placeholder={t('organisms.job_form.form4.gender_placeholder')!}
          onChange={handleOnChange}
        >
          <MenuItem value="Masculino">{t('global.male')}</MenuItem>
          <MenuItem value="Feminino">{t('global.female')}</MenuItem>
          <MenuItem value="sla">sla</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form4.xp_label')}</FormLabel>
        <TextField
          multiline
          name="experiencia_trabalho"
          value={form.experiencia_trabalho}
          placeholder={t('organisms.job_form.form4.xp_placeholder')!}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form4.pid_label')}</FormLabel>
        <Select
          name="habilitacao_pid"
          value={form.habilitacao_pid}
          placeholder={t('organisms.job_form.form4.pid_placeholder')!}
          onChange={handleOnChange}
        >
          <MenuItem value="true">Sim</MenuItem>
          <MenuItem value="false">Não</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form4.passaport_label')}</FormLabel>
        <Select
          name="passaporte"
          value={form.passaporte}
          placeholder={t('organisms.job_form.form4.passaport_placeholder')!}
          onChange={handleOnChange}
        >
          <MenuItem value="true">{t('global.yes')}</MenuItem>
          <MenuItem value="false">{t('global.no')}</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>{t('organisms.job_form.form4.newsletter_label')}</FormLabel>
        <RadioGroup row name="receber_newsletter">
          <FormControlLabel
            value={true}
            control={<Radio />}
            label={t('global.yes')}
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label={t('global.no')}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}
export default NewJobForm4
