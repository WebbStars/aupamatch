import { Paper as MuiPaper } from '@mui/material'
import { styled } from '@mui/material/styles'

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: '32px 32px 16px 32px',

  [theme.breakpoints.down('md')]: {
    width: '460px',
  },
  [theme.breakpoints.up('md')]: {
    width: '600px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '761px',
  },
}))

const classes = {}

export { Paper, classes }
