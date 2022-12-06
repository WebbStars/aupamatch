import React from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
// import { useTranslation } from 'react-i18next'

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
  // const { t } = useTranslation()

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
        <FormLabel>Passaporte</FormLabel>
        <TextField
          name="passaporte"
          variant="outlined"
          value={form.passaporte}
          placeholder="Passaporte"
          onChange={handleOnChange}
        />
      </FormControl>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Estado</FormLabel>
            <TextField
              name="estado"
              value={form.estado}
              placeholder="Estado"
              onChange={handleOnChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Cidade</FormLabel>
            <TextField
              name="cidade"
              value={form.cidade}
              placeholder="Cidade"
              onChange={handleOnChange}
            />
          </FormControl>
        </Grid>
      </Grid>

      <FormControl fullWidth>
        <FormLabel>CEP</FormLabel>
        <TextField
          name="cep"
          value={form.cep}
          placeholder="CEP"
          onChange={handleOnChange}
        />
      </FormControl>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Logradouro</FormLabel>
            <TextField
              name="logradouro"
              value={form.logradouro}
              placeholder="Logradouro"
              onChange={handleOnChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Numero</FormLabel>
            <TextField
              name="numero"
              value={form.numero}
              placeholder="Número"
              onChange={handleOnChange}
            />
          </FormControl>
        </Grid>
      </Grid>

      <FormControl fullWidth>
        <FormLabel>Complemento</FormLabel>
        <TextField
          name="complemento"
          value={form.complemento}
          placeholder="Complemento"
          onChange={handleOnChange}
        />
      </FormControl>
    </Box>
  )
}
export default NewJobForm2
