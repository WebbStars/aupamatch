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
  Tooltip,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { HelpOutlineTwoTone } from '@mui/icons-material'
import { theme } from '../../../styles'

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
      <FormControl required>
        <FormLabel>Nacionalidade</FormLabel>
        <TextField
          required
          name="nacionalidade"
          value={form.nacionalidade}
          placeholder="Nacionalidade"
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl fullWidth required>
        <FormLabel>Experiências profissionais</FormLabel>
        <TextField
          required
          multiline
          name="experiencia_trabalho"
          value={form.experiencia_trabalho}
          placeholder="experiencias profissionais"
          onChange={handleOnChange}
        />
      </FormControl>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <FormLabel>Sabe nadar?</FormLabel>
            <Select
              required
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

        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <Box display="flex" gap={1} color={theme.palette.primary.main}>
              <FormLabel>Carro exclusivo</FormLabel>
              <Tooltip title="Tem interesse de ter um carro exclusivo cedido pela família?">
                <HelpOutlineTwoTone />
              </Tooltip>
            </Box>
            <Select
              required
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
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <Box display="flex" gap={1} color={theme.palette.primary.main}>
              <FormLabel>
                {t('organisms.job_form.temporary_form.children_label')}
              </FormLabel>
              <Tooltip
                title={t('organisms.job_form.temporary_form.children_helper')}
              >
                <HelpOutlineTwoTone />
              </Tooltip>
            </Box>

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

        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <FormLabel>Possui Habilitação</FormLabel>
            <Select
              required
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

      <FormControl required>
        <Box display="flex" gap={1} color={theme.palette.primary.main}>
          <FormLabel>Data de Disponibilidade</FormLabel>
          <Tooltip title="A data de disponibilidade é a data prevista de embarque">
            <HelpOutlineTwoTone />
          </Tooltip>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            InputProps={{ required: true }}
            views={['year', 'month', 'day']}
            inputFormat="DD/MM/YYYY"
            value={form.data_disponibilidade}
            onChange={(event) =>
              handleChangeData('data_disponibilidade', event)
            }
            renderInput={(params: any) => (
              <TextField
                {...params}
                error={false}
                placeholder="Qual é a sua data de disponibilidade para iniciar?"
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>A au pair deseja receber newsletter?</FormLabel>
        <RadioGroup
          row
          name="receber_newsletter"
          value={form.receber_newsletter}
          onChange={handleOnChange}
        >
          <FormControlLabel
            value={'true'}
            control={<Radio />}
            label={t('global.yes')}
          />
          <FormControlLabel
            value={'false'}
            control={<Radio />}
            label={t('global.no')}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}
export default NewJobForm3
