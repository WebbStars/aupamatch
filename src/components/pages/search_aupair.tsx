import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, Button, Typography } from '@mui/material'
import LoggedTemplate from '../templates/logged'
import { searchAupairImage } from '../../images'
import { theme } from '../../styles'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { fetchUserProfile } from '../../store/user'
import { useDispatch } from '../../store'
import { FetchUserProfileState } from '../../services'
import NeedContract from './contract'
import { publishPayment } from '../../services/publish_payment'
import { setErrorMessage } from '../../store/notifications'

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
  const accessToken = sessionStorage.getItem('accessToken')

  const [needPayment, setNeedPayment] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<FetchUserProfileState>(
    {} as any
  )

  const fetchUserData = async () => {
    const accessToken = sessionStorage.getItem('accessToken')

    const response = dispatch(await fetchUserProfile(accessToken!))

    if (response) setCurrentUser(response.payload as FetchUserProfileState)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const postJob = () => {
    if (!currentUser) return

    if (currentUser.pagamentoPublicador) {
      navigate('/post_job')
      return
    } else {
      setNeedPayment(true)
    }
  }

  const payPublishService = async () => {
    setIsLoading(true)
    const { response } = await publishPayment(accessToken!)

    setIsLoading(false)
    if (response) {
      setIsPaying(true)
      window.open(response.approvalUrl, '_blank')!.focus()
      return
    }

    dispatch(
      setErrorMessage(
        'Erro ao tentar realizar o pagamento, tente novamente mais tarde!'
      )
    )
  }

  useEffect(() => {
    if (currentUser.pagamentoPublicador) return

    const refreshIntervalId = setInterval(async () => {
      await fetchUserData()
    }, 5000)

    return () => {
      window.clearInterval(refreshIntervalId)
    }
  }, [currentUser.pagamentoPublicador])

  if (needPayment) {
    return (
      <NeedContract
        handleSubmit={payPublishService}
        family
        detail="Publicar vagas - $20.00"
        isLoading={isLoading}
        isPaying={isPaying}
      />
    )
  }

  return (
    <LoggedTemplate family footer>
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
              disabled={Object.keys(currentUser).length === 0}
              onClick={postJob}
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
