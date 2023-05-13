import { FormControl, MenuItem, TextField } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classes from './styles'
import { System } from '../../services/validate_token'

interface Props {
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => void
  authSystems: System[]
  value: string
}

const SystemSelect: React.FC<Props> = ({
  handleChange,
  authSystems,
  value,
}) => {
  const { t } = useTranslation()

  return (
    <FormControl fullWidth required sx={classes.system}>
      <TextField
        id="authenticator-system"
        select
        name="authenticator_id"
        value={value}
        label={t(
          'features.reset_password.components.change_password.form.system_label'
        )}
        defaultValue={authSystems?.length === 1 && authSystems[0]}
        onChange={handleChange}
      >
        {authSystems?.map((system, index: number) => (
          <MenuItem key={index} value={system.id}>
            {system.name}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  )
}

export default SystemSelect
