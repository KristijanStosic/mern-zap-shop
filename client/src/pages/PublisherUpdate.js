import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
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
import { toast } from 'react-toastify'
import { PUBLISHER_UPDATE_RESET } from '../redux/constants/publisherConstants'
import { getPublisherDetails, updatePublisher } from '../redux/actions/publisherActions'

const PublisherUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const [name, setName] = useState('')

  const publisherId = params.id

  const publisherDetails = useSelector((state) => state.publisherDetails)
  const { loading: loadingPublisher, error, publisher } = publisherDetails

  const publisherUpdate = useSelector((state) => state.publisherUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = publisherUpdate

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: PUBLISHER_UPDATE_RESET })
      navigate('/admin/publisher-list')
    } else {
      if (!publisher || publisher._id !== publisherId) {
        dispatch(getPublisherDetails(publisherId))
      } else {
        setName(publisher.name)
      }
    }
    
  }, [dispatch, publisherId, publisher, successUpdate, navigate])

  const updatePublisherHandler = (e) => {
    e.preventDefault()
    dispatch(updatePublisher({ _id: publisherId, name }))
    toast.info('Publisher updated successfully')
  }

  return (
    <>
      <Meta title={'Update Publisher Page'} />
      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Button variant='contained' component={Link} to={`/admin/publisher-list`}>
          Go Back
        </Button>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {loadingPublisher ? (
            <Loading message='Loading...' />
          ) : error ? (
            <Alert severity='error'>{error}</Alert>
          ) : (
            <>
              <Typography component='h1' variant='h5'>
                UPDATE CATPUBLISHEREGORY
              </Typography>
              {loadingUpdate && <Loading message='' />}
              {errorUpdate && <Alert severity='error'>{errorUpdate}</Alert>}
              <Box
                component='form'
                onSubmit={updatePublisherHandler}
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
                  UPDATE
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  )
}

export default PublisherUpdate
