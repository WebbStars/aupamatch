import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/styles/makeStyles'
import { Box } from '@mui/material'
import { useDispatch } from '../../store'
import { fetchUser } from '../../store/user'
import { PostJobStepper } from '../organisms/'
import LoggedTemplate from '../templates/logged'
import { getJob } from '../../services'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles({
  main: {
    display: 'grid',
    justifyItems: 'center',
    width: '100%',
  },
})

const EditJob: React.FC = () => {
  const [jobToEdit, setJobToEdit] = useState({})
  const classes = useStyles()
  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = sessionStorage.getItem('accessToken')

      const [_user, selectedJobToEdit] = await Promise.all([
        dispatch(await fetchUser(accessToken!)),
        await getJob(accessToken!, id!),
      ])

      setJobToEdit(selectedJobToEdit.response)
    }

    fetchUserData()
  }, [])

  return (
    <LoggedTemplate family>
      <Box className={classes.main} padding={{ lg: '36px 40px' }}>
        <PostJobStepper jobToEdit={jobToEdit} isEdit />
      </Box>
    </LoggedTemplate>
  )
}

export default EditJob
