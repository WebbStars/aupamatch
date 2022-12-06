import { makeStyles } from '@material-ui/styles'
import { Box, Chip, Grid, Paper, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { theme } from '../../styles'
import { CustomButton } from '../atoms'

const useStyles = makeStyles({
  paper: {
    padding: 24,
    borderRadius: 10,
    height: '440',
    maxHeight: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 30
  }
})

const ProfileCardData: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const skills = ['Paciente', '+500 horas', 'Curso de babá', 'Animada']

  return (
    <Paper className={classes.paper}>
      <Box>
        <Typography fontWeight="bold">
          {t('molecules.profile_card_data.availability')}
        </Typography>
        <Box
          borderRadius="10px"
          bgcolor={theme.palette.primary.main}
          color="white"
          padding={0.6}
        >
          <Typography fontSize="10px">
            🔥 Disponibilidade para trabalhar
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography fontWeight="bold">
          {t('molecules.profile_card_data.network')}
        </Typography>
        <Box borderRadius="10px" padding={0.6}>
          <Typography fontSize="12px">18 Vagas Favoritas</Typography>
          <Typography fontSize="12px">2 Candidaturas</Typography>
        </Box>
      </Box>

      <Box>
        <Typography fontWeight="bold">
          {t('molecules.profile_card_data.skills')}
        </Typography>
        <Grid container spacing={2} mt={1}>
          {skills.splice(0, 4).map((skill) => (
            <Grid item key={skill}>
              <Chip
                label={skill}
                variant="outlined"
                sx={{
                  borderRadius: '3px',
                  backgroundColor: theme.palette.grey[300],
                  border: 'none'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Tooltip title={t('global.disabled')}>
        <CustomButton width="100%" height="48px" disabled>
          {/* {t('molecules.profile_card_data.profile_button')} */}
          fodase
        </CustomButton>
      </Tooltip>
    </Paper>
  )
}

export default ProfileCardData
