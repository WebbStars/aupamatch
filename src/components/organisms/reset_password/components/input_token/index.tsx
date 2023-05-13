import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react'
import { Box, TextField } from '@mui/material'
import classes from './styles'

interface Props {
  setToken: Dispatch<SetStateAction<string>>
}

const InputToken: React.FC<Props> = ({ setToken }) => {
  const [inputFocus, setInputFocus] = useState<number>(0)
  const refs = useRef<HTMLInputElement[]>([])

  const UNIC_ALPHA_NUMERIC = /^[a-zA-Z0-9]{1}$/
  const isValidAlphaNumeric = (str: string) => UNIC_ALPHA_NUMERIC.test(str)

  useEffect(() => {
    setTimeout(() => {
      refs.current[inputFocus].focus()
    }, 0)
  }, [inputFocus])

  const fields = [
    'field-1',
    'field-2',
    'field-3',
    'field-4',
    'field-5',
    'field-6',
    'field-7',
  ]

  const setNewToken = () => {
    const newToken = refs.current.map((each) => each.value).join('')
    setToken(newToken)
  }

  const handleCodeInputs = (
    event: React.KeyboardEvent<HTMLDivElement>,
    position: number
  ) => {
    const isBackspace = event.key === 'Backspace'
    const isTab = event.key === 'Tab'

    if (isTab) return

    if (isBackspace && position === 0) return

    if (isBackspace) {
      setInputFocus(position - 1)

      if (!refs.current[position].value) refs.current[position - 1].value = ''
      return
    }

    if (!isValidAlphaNumeric(event.key)) {
      event.preventDefault()
      return
    }

    if (position < 6) {
      if (refs.current[position].value) {
        refs.current[position + 1].value = event.key
      }
      setInputFocus(position + 1)
    }
    setNewToken()
  }

  const handleOnPaste = (
    event: React.ClipboardEvent<HTMLDivElement>,
    initialPosition: number
  ) => {
    let value = event.clipboardData.getData('text/plain')
    const finalPosition = initialPosition + value.length

    // Corta o token colado do valor inicial ate a quantidade de casas disponiveis
    const finalSubstring =
      finalPosition > 7 ? 7 - initialPosition : value.length

    value = value.substring(0, finalSubstring)

    const lastPasteInput = finalPosition > 7 ? 7 : finalPosition

    for (let index = initialPosition; index < lastPasteInput; index += 1) {
      refs.current[index].value = value[index - initialPosition]
    }

    setInputFocus(lastPasteInput === 7 ? lastPasteInput - 1 : lastPasteInput)

    setNewToken()
  }

  return (
    <Box component="div" sx={classes.root}>
      {fields.map((field, index) => (
        <TextField
          id={`textfield-input-token-${index}`}
          data-test={`textfield-input-token-${index}`}
          key={`textfield-input-token-${index}`}
          name={field}
          sx={classes.textfield}
          ref={(el) => {
            refs.current[index] = el?.firstElementChild
              ?.firstChild as HTMLInputElement
          }}
          onChange={setNewToken}
          onPaste={(event) => {
            handleOnPaste(event, index)
          }}
          onKeyDown={(event) => {
            handleCodeInputs(event, index)
          }}
          inputProps={{
            maxLength: 1,
            sx: classes.input,
          }}
          fullWidth
        />
      ))}
    </Box>
  )
}

export default InputToken
