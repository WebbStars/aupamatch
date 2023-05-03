import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@mui/material'
import LoggedTemplate from '../templates/logged'
import { searchAupairImage } from '../../images'
import { theme } from '../../styles'
import { Close, Search } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../../store/user'
import { useDispatch } from '../../store'

const useStyles = makeStyles({
  searchSection: {
    height: 80,
    backgroundColor: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    padding: 50,
  },
  searchInput: {
    width: '100%',
    fontWeight: 'bold',
  },
  root: {
    display: 'flex',
    backgroundColor: '#ffff',
    [theme.breakpoints.up('md')]: {
      height: '560px',
    },
    [theme.breakpoints.down('md')]: {
      height: 'auto',
    },
  },
  illustration: {
    backgroundImage: `url(${searchAupairImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',

    [theme.breakpoints.down('md')]: {
      height: '380px',
      backgroundPosition: 'center top',
    },
    [theme.breakpoints.down('sm')]: {
      height: '240px',

      backgroundRepeat: 'no-repeat',
    },
  },
  secondaryButton: {
    backgroundColor: `${theme.palette.primary.light} !important`,
    color: `${theme.palette.primary.main} !important`,
    fontWeight: 'bold',
  },
  titleSpan: {
    color: theme.palette.primary.main,
  },
})

const SearchAupair: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [aupair, setAupair] = useState('')

  const submitSearchAupair = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(aupair)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = sessionStorage.getItem('accessToken')

      dispatch(await fetchUser(accessToken!))
    }

    fetchUserData()
  }, [])

  return (
    <LoggedTemplate family footer>
      <Paper
        component="form"
        onSubmit={submitSearchAupair}
        className={classes.searchSection}
      >
        <Box
          display="flex"
          width="100%"
          border="0.25px solid #D4D4D8"
          borderRadius="4px"
        >
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            <Search />
          </IconButton>
          <InputBase
            autoFocus
            sx={{ ml: 1, flex: 1 }}
            placeholder="Procure Au Pair"
            inputProps={{ 'aria-label': 'Procure Au Pair' }}
            onChange={(e) => setAupair(e.target.value)}
            value={aupair}
            className={classes.searchInput}
          />
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={() => setAupair('')}
          >
            <Close />
          </IconButton>
        </Box>
      </Paper>
      <Box
        width="100%"
        id="about-section"
        component="section"
        flexDirection={{ md: 'row', xs: 'column' }}
        alignItems={{ md: 'auto', xs: 'center' }}
        justifyContent={{ md: 'space-between', xs: 'center' }}
        pl={{ lg: 16, md: 6, xs: 0 }}
        className={classes.root}
        gap={{ xs: 1, md: 8 }}
        flex="1 0 auto"
      >
        <Box
          width={{ xs: 1, md: 0.5 }}
          textAlign={{ md: 'left', xs: 'center' }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mt={{ md: 0, xs: 8 }}
          order={{ md: 0, xs: 1 }}
          py={{ xs: 3, lg: 0 }}
        >
          <Typography fontSize={36} fontWeight="bold" lineHeight="146.28%">
            {t('pages.search_aupair.title')}
          </Typography>
          <Typography
            fontSize={14}
            fontFamily="Montserrat"
            lineHeight="146.28%"
            fontWeight="bold"
            color={theme.palette.grey[600]}
            mt={2}
          >
            {t('pages.search_aupair.subtitle')}
          </Typography>

          <Box
            display="flex"
            mt={8}
            gap={2}
            justifyContent={{ md: 'flex-start', xs: 'center' }}
          >
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => navigate('/post_job')}
            >
              {t('pages.search_aupair.post_now')}
            </Button>
          </Box>
        </Box>
        <Box width="100%" className={classes.illustration} />
      </Box>
    </LoggedTemplate>
  )
}

export default SearchAupair
