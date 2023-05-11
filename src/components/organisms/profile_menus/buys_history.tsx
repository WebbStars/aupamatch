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
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { FetchBuysHistoryState, getBuysHistory } from '../../../services'
import { formatTableDate } from '../../../utils'
import useOverflow from '../../../hooks/use_overflow'

const BuysHistory: React.FC = () => {
  const accessToken = sessionStorage.getItem('accessToken')

  const [history, setHistory] = useState<FetchBuysHistoryState[]>([])
  const [isFetching, setIsFetching] = useState(true)

  const overflowingRef = useRef<HTMLSpanElement | null>(null)
  const activeOverflow = useOverflow(overflowingRef, isFetching)

  useEffect(() => {
    const asyncEffect = async () => {
      if (!accessToken) return

      const { response } = await getBuysHistory(accessToken)

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
          Histórico de login
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          marginTop: 4,
          maxHeight: '640px',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Data de compra</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Produto
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Valor
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
                  <Tooltip title={activeOverflow ? row.product : ''}>
                    <TableCell
                      align="center"
                      sx={{
                        maxWidth: '250px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      ref={overflowingRef}
                    >
                      {row.product}
                    </TableCell>
                  </Tooltip>
                  <TableCell align="right">R${row.value},00</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default BuysHistory
