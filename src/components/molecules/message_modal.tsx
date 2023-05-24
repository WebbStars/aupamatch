import { makeStyles } from '@material-ui/styles'
import { CheckCircleOutline, ErrorOutline, Info } from '@mui/icons-material'
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Paper,
  Typography,
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { theme } from '../../styles'

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '100%',
    height: '368px',
    maxWidth: '572px',
    padding: '32px',
    margin: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    flexDirection: 'column',
    position: 'relative',
    borderRadius: '8px',
    outline: 'none',
    color: theme.palette.secondary.dark,
  },
  buttons: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    gap: 16,
    marginTop: 12,

    '& button': {
      borderRadius: '8px',
      padding: '8px 32px',
    },
  },
})

interface Props {
  handleSubmit?: () => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  error?: boolean
  success?: boolean
  info?: boolean
  title: string
  subtitle?: string
  secondaryButton?: React.ReactNode
}

const MessageModal: React.FC<Props> = ({
  handleSubmit,
  open,
  setOpen,
  error,
  success,
  title,
  subtitle,
  secondaryButton,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement>,
    _reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    event.stopPropagation()

    // if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    setOpen(false)
  }

  const handleSubmitModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    handleSubmit ? handleSubmit() : setOpen(false)
  }

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    setOpen(false)
  }

  return (
    <Modal
      data-test="consent-scopes-modal"
      aria-labelledby="modal-title"
      aria-describedby="description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{ backdrop: Backdrop }}
      className={classes.modal}
    >
      <Fade in={open}>
        <Paper elevation={2} className={classes.paper}>
          {success && (
            <CheckCircleOutline sx={{ fontSize: 90 }} color="success" />
          )}
          {error && <ErrorOutline sx={{ fontSize: 90 }} color="error" />}
          {!success && !error && <Info sx={{ fontSize: 90 }} color="info" />}

          <Box sx={{ textAlign: 'center' }}>
            <Typography color="#0D114F" fontSize={24} fontWeight="bold">
              {title}
            </Typography>
            {subtitle && (
              <Typography color="#4D5E77" fontSize={16}>
                {subtitle}
              </Typography>
            )}
          </Box>

          <Box className={classes.buttons}>
            {secondaryButton || (
              <Button
                variant="contained"
                onClick={handleCancel}
                sx={{ background: 'grey' }}
              >
                Cancelar
              </Button>
            )}
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmitModal}
            >
              {t('molecules.message_modal.continue')}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default MessageModal
