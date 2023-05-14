import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FetchLoginHistoryState, getLoginHistory } from '../../../services'
import { formatTableDate } from '../../../utils'

const LoginHistory: React.FC = () => {
  const [history, setHistory] = useState<FetchLoginHistoryState[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const accessToken = sessionStorage.getItem('accessToken')
  const { t } = useTranslation()

  useEffect(() => {
    const asyncEffect = async () => {
      if (!accessToken) return

      const { response } = await getLoginHistory(accessToken)

      if (response) setHistory(response)
      setIsFetching(false)
    }

    asyncEffect()
  }, [accessToken])

  return (
    <Paper
      sx={{
        width: 704,
        maxWidth: '100%',
        height: 'fit-content',
        padding: '20px 28px',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          {t('organisms.profile_menu.login_history')}
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          marginTop: 4,
          maxHeight: '640px',
          overflow: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('organisms.profile_menu.when')}</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                {t('organisms.profile_menu.ip')}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                {t('organisms.profile_menu.location')}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isFetching ? (
              <>
                <TableRow>
                  <TableCell align="left" scope="row">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left" scope="row">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left" scope="row">
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" scope="row">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left" scope="row">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left" scope="row">
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
              </>
            ) : (
              history.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left" scope="row">
                    {formatTableDate(row.date)}
                  </TableCell>
                  <TableCell align="center">{row.ipAddress}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default LoginHistory
