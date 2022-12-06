import React from 'react'
import { Box, Tooltip, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { brazilFlag, euaFlag } from '../../images'

interface Props {
  flags?: boolean
}

const ChangeLanguage: React.FC<Props> = ({ flags = false }) => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (selected: string) => () => {
    switch (selected) {
      case 'pt':
        return i18n.changeLanguage('pt')
      case 'en':
        return i18n.changeLanguage('en')
      default:
        return undefined
    }
  }

  return (
    <Box display="flex" alignItems="center">
      <Tooltip
        data-testid="change-language-portuguese"
        title={t('organisms.change_language.portuguese') as string}
      >
        <IconButton
          aria-label={t('organisms.change_language.portuguese')!}
          onClick={changeLanguage('pt')}
        >
          {flags ? (
            <img
              src={brazilFlag}
              alt={t('organisms.change_language.brazil_flag')!}
              height={24}
              width={24}
            />
          ) : (
            <Typography>PT</Typography>
          )}
        </IconButton>
      </Tooltip>
      <Tooltip
        data-testid="change-language-english"
        title={t('organisms.change_language.english') as string}
      >
        <IconButton
          aria-label={t('organisms.change_language.english')!}
          onClick={changeLanguage('en')}
        >
          {flags ? (
            <img
              src={euaFlag}
              alt={t('organisms.change_language.en_flag')!}
              height={24}
              width={24}
            />
          ) : (
            <Typography>EN</Typography>
          )}
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ChangeLanguage
