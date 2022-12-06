import React, { Dispatch, SetStateAction } from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'

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

const NewJobForm3: React.FC<Props> = ({ form, setForm, handleOnChange }) => {
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
            <FormLabel>Sabe nadar?</FormLabel>
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

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth required>
            <FormLabel>
              {t('organisms.job_form.temporary_form.children_label')}
            </FormLabel>
            <TextField
              required
              type="number"
              name="quantidade_criancas"
              value={form.quantidade_criancas}
              placeholder={
                t('organisms.job_form.temporary_form.children_placeholder')!
              }
              onChange={handleOnChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Possui Habilitação</FormLabel>
            <Select
              name="habilitacao"
              value={form.habilitacao}
              placeholder="Possui Habilitação"
              onChange={handleOnChange}
            >
              <MenuItem value="true">{t('global.yes')}</MenuItem>
              <MenuItem value="false">{t('global.no')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <FormControl>
        <FormLabel>Data de Disponibilidade</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            views={['year', 'month', 'day']}
            inputFormat="DD/MM/YYYY"
            value={form.data_disponibilidade}
            onChange={(event) =>
              handleChangeData('data_disponibilidade', event)
            }
            renderInput={(params: any) => (
              <TextField
                {...params}
                placeholder="Qual é a sua data de disponibilidade para iniciar?"
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>A au pair deseja receber newsletter?</FormLabel>
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
export default NewJobForm3
