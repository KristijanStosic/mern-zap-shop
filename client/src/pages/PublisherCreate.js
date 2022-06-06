import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Container,
} from '@mui/material'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { createPublisher } from '../redux/actions/publisherActions'
import { PUBLISHER_CREATE_RESET } from '../redux/constants/publisherConstants'

const PublisherCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')

  const publisherCreate = useSelector((state) => state.publisherCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, publisher } = publisherCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PUBLISHER_CREATE_RESET })
    if(userInfo.user.role !== 'admin') {
      navigate('/login')
    }

    if(successCreate) {
      navigate('/admin/publisher-list')
    } 
    
  }, [dispatch, userInfo, successCreate, publisher, navigate])

  const createPublisherHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set('name', name)

    dispatch(createPublisher({ name }))
  }

  return (
    <>
      <Meta title={'Admin Create Publisher Page'} />
      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Button variant='contained' component={Link} to={`/admin/publisher-list`}>
          Go Back
        </Button>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
        {loadingCreate && <Loading message='Loading...' />}
          {loadingCreate ? (
            <Loading message='Loading...' />
          ) : errorCreate ? (
            <Alert severity='error'>{errorCreate}</Alert>
          ) : (
            <>
              <Typography component='h1' variant='h5'>
               CREATE PUBLISHER
              </Typography>
              {loadingCreate && <Loading message='Creating publisher...' />}
              {errorCreate && <Alert severity='error'>{errorCreate}</Alert>}
              <Box
                component='form'
                onSubmit={createPublisherHandler}
                noValidate
                sx={{ mt: 2 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='name'
                  autoFocus
                  id='name'
                  label='Name'
                  type='name'
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  CREATE
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  )
}


export default PublisherCreate
