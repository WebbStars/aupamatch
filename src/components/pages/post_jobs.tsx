import makeStyles from '@material-ui/styles/makeStyles'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from '../../store'
import { fetchUser } from '../../store/user'
import { PostJobStepper } from '../organisms/'
import LoggedTemplate from '../templates/logged'

const useStyles = makeStyles({
  main: {
    display: 'grid',
    justifyItems: 'center',
    width: '100%',
  },
})

const PostJobs: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = sessionStorage.getItem('accessToken')

      dispatch(await fetchUser(accessToken!))
    }

    fetchUserData()
  }, [])

  return (
    <LoggedTemplate family>
      <Box className={classes.main} padding={{ lg: '36px 40px' }}>
        <PostJobStepper />
      </Box>
    </LoggedTemplate>
  )
}

export default PostJobs
