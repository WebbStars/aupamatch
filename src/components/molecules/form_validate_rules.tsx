import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'
import { theme } from '../../styles'
import { makeStyles } from '@material-ui/styles'

type RuleProp = {
  isValid: boolean
  text: string
}

interface Props {
  title: string
  rules: RuleProp[]
}

const useStyles = makeStyles({
  legend: {
    color: theme.palette.grey[500],
    textAlign: 'justify',
    lineHeight: 1.6,
    width: '100%'
  },
  fontColorGreen: {
    color: theme.palette.success.main
  }
})

const ruleIcon = (isValid: boolean): React.ReactNode | string => {
  return isValid ? <CheckCircleOutline sx={{ fontSize: '12px' }} /> : '-'
}

const FormValidateRules: React.FC<Props> = ({ title, rules }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} className={classes.legend}>
      <Typography fontWeight="bold">{title}</Typography>

      {rules.map((rule, index) => (
        <Box key={`${rule}-${index}`} display="flex" alignItems="center">
          <Typography
            fontSize="small"
            key={`typography-form-validate-rules-${index}`}
            className={`${rule.isValid && classes.fontColorGreen}`}
          >
            {ruleIcon(rule.isValid)} {rule.text}
          </Typography>
        </Box>
      ))}
    </Grid>
  )
}

export default FormValidateRules
