import React, { Dispatch, SetStateAction, useRef } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
// import { useTranslation } from 'react-i18next'
import MaskedInput from '../../molecules/masked_inputs'

type Object = { [key: string]: any }

interface Props {
  form: Object
  handleOnChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<any>
  ) => void
  setForm: Dispatch<SetStateAction<any>>
}

const NewJobForm2: React.FC<Props> = ({ form, handleOnChange, setForm }) => {
  // const { t } = useTranslation()
  const numberInputRef = useRef<HTMLDivElement | null>(null)

  // const requestCepPromise = async (cep: string) => {
  //   if (cep.length === 8) {
  //     const postalAddress = await cepPromise(cep).catch(() => null)

  //     if (postalAddress === null) {
  //       alert('cep inválido')
  //       return
  //     }

  //     console.log(postalAddress)

  //     setForm({
  //       ...form,
  //       cep,
  //       cidade: postalAddress.city,
  //       estado: postalAddress.state,
  //       logradouro: postalAddress.street,
  //       country: 'Brasil',
  //     })

  //     numberInputRef?.current?.focus()
  //   }
  // }

  // const handleChangeCep = async (
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   const validCepLength = form.cep.length < 8

  //   if (validCepLength) {
  //     requestCepPromise(event.target.value)
  //   }

  //   setForm((oldForm: Object) => ({ ...oldForm, cep: event.target.value }))
  // }

  const handleChangeNoSpecial = (
    name: string,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const result = event.target.value.replace(/[^a-zA-Z0-9]/gi, '')

    setForm((oldForm: Object) => ({ ...oldForm, [name]: result }))
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
        <FormLabel>Passaporte</FormLabel>

        <MaskedInput
          id="textfield-post-code"
          name="passaporte"
          mask="**************"
          value={form.passaporte}
          fullWidth
          placeholder="Passaporte"
          onChange={(event) => handleChangeNoSpecial('passaporte', event)}
          data-test="textfield-post-code"
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>CEP</FormLabel>
        <MaskedInput
          id="textfield-post-code"
          name="cep"
          mask="00000000000"
          value={form.cep}
          placeholder="CEP"
          fullWidth
          inputProps={{ pattern: '([0-9]{5}-[0-9]{3})' }}
          onChange={handleOnChange}
          data-test="textfield-post-code"
        />
      </FormControl>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Estado</FormLabel>
            <TextField
              type="text"
              name="estado"
              value={form.estado}
              placeholder="Estado"
              onChange={(event) => handleChangeNoSpecial('estado', event)}
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
              onChange={(event) => handleChangeNoSpecial('cidade', event)}
            />
          </FormControl>
        </Grid>
      </Grid>

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
              type="number"
              value={form.numero}
              placeholder="Número"
              onChange={handleOnChange}
              inputRef={numberInputRef}
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
