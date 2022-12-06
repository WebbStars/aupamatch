import React, { useEffect, useState, useRef } from 'react'
import { ContentCopy } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  value: string
}

const CopyButton: React.FC<Props> = ({ value }) => {
  const timeout = useRef<NodeJS.Timeout | undefined>(undefined)
  const [wasCopied, setWasCopied] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  const handleCopy = () => {
    setWasCopied(true)

    navigator.clipboard.writeText(value)

    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setWasCopied(false)
    }, 2000)
  }

  const title = t('atoms.copy_button.title')

  return (
    <IconButton title={title} onClick={handleCopy}>
      <ContentCopy fontSize="small" color="info" />

      {wasCopied && (
        <Typography fontSize={11} fontWeight="bold" fontStyle="italic">
          {t('atoms.copy_button.copied')}
        </Typography>
      )}
    </IconButton>
  )
}

export default CopyButton
