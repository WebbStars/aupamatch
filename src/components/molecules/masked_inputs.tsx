import {
  InputBaseComponentProps,
  TextField,
  InputProps,
  TextFieldProps,
} from '@mui/material'

type onChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface IMaskedInput {
  value: string
  onChange: (event: onChangeEvent, index: number) => void
  mask: string
  fullWidth?: boolean
  inputProps?: InputBaseComponentProps & InputProps
  disabled?: boolean
}

type MaskedInputProps = IMaskedInput & Omit<TextFieldProps, 'onChange'>

const MaskedInput: React.FC<MaskedInputProps> = ({
  onChange,
  name = '',
  mask,
  value,
  inputProps,
  ...props
}) => {
  const masked = IMask.createMask({
    mask,
  })

  function handleChange(event: onChangeEvent, index: number) {
    masked.resolve(event.target.value)
    const newEvent = {
      ...event,
      target: {
        ...event.target,
        name,
        value: mask ? masked.unmaskedValue : event.target.value,
      },
    }
    onChange(newEvent, index)
  }

  return (
    <>
      <TextField
        {...props}
        value={mask ? masked.resolve(value) : value}
        onChange={(event) => handleChange(event, inputProps?.inputProps?.index)}
        InputProps={inputProps || {}}
      />
    </>
  )
}

export default MaskedInput
