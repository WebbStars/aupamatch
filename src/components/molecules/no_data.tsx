import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { noData } from '../../images'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
  size?: string | number
  title?: string
  link?: string
  linkText: string
}

const NoData: React.FC<Props> = ({ size = 400, title, link, linkText }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      gap={4}
      height="100%"
    >
      <img
        src={noData}
        alt={'no data found'}
        height={size}
        width={size}
        style={{ alignSelf: 'center' }}
      />

      <Box>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>

        <Link
          to={link || '#'}
          component={RouterLink}
          underline="none"
          fontSize="18px"
        >
          {linkText}
        </Link>
      </Box>
    </Box>
  )
}

export default NoData
