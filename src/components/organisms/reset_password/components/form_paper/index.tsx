import React from 'react'
import { Grid, Typography, Box, Divider, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import classes from './styles'
import FormButtons from '../form_buttons'

interface Props {
  title: string
  subtitle?: string
  children: React.ReactNode
  handleClose?: (event?: unknown, reason?: unknown) => void
  handleSubmit?: (event?: any, reason?: any) => void
  submitLabel?: string
  isLoading?: boolean
  customButton?: React.ReactNode
}

const FormPaper: React.FC<Props> = ({
  title,
  subtitle,
  children,
  handleClose,
  handleSubmit,
  submitLabel,
  isLoading,
  customButton,
}) => {
  const { t } = useTranslation()

  return (
    <Paper sx={classes.paper}>
      <Box component="form" onSubmit={handleSubmit} sx={classes.form}>
        <Grid item xs={12}>
          <Typography sx={classes.title}>{title}</Typography>
          <Typography sx={classes.subtitle}>{subtitle}</Typography>
        </Grid>

        <Divider sx={classes.topDivider} />

        {children}

        <Divider sx={classes.bottomDivider} />

        <FormButtons
          customButton={customButton}
          isLoading={isLoading}
          buttonSubmit={{
            id: 'button-submit-verify-email',
            name: 'button-submit-verify-email',
            label:
              submitLabel ||
              t(
                'features.reset_password.components.form_paper.default_submit_label'
              )!,
          }}
          buttonCancel={
            handleClose
              ? {
                  id: 'button-cancel-verify-email',
                  name: 'button-cancel-verify-email',
                  label: t(
                    'features.reset_password.components.form_paper.cancel'
                  )!,
                  handleCancel: handleClose,
                }
              : {
                  isHidden: true,
                }
          }
        />
      </Box>
    </Paper>
  )
}

export default FormPaper
