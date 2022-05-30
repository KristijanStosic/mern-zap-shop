import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  Typography,
  TextField,
  FormControl,
  Select,
  Button,
  Box,
  Paper,
  Container,
  MenuItem,
} from '@mui/material'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { getUserDetails, updateUser } from '../redux/actions/userActions'
import { USER_UPDATE_RESET } from '../redux/constants/userConstants'

const UserUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')

  const userId = params.id

  const userDetails = useSelector((state) => state.userDetails)
  const { loading: loadingUser, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    // if successUpdate reset user state and redirect to user list
    if(successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/user-list')
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setRole(user.role)
      }
    }
    
  }, [dispatch, userId, user, successUpdate, navigate])

  const updateUserHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, role }))
  }

  return (
    <>
      <Meta title={'Update User Page'} />
      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Button variant='contained' component={Link} to={`/admin/user-list`}>
          Go Back
        </Button>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {loadingUser ? (
            <Loading message='Loading...' />
          ) : error ? (
            <Alert severity='error'>{error}</Alert>
          ) : (
            <>
              <Typography component='h1' variant='h5'>
                UPDATE USER
              </Typography>
              {loadingUpdate && <Loading message='' />}
              {errorUpdate && <Alert severity='error'>{errorUpdate}</Alert>}
              <Box
                component='form'
                onSubmit={updateUserHandler}
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
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='email'
                  id='email'
                  label='Email'
                  name='email'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <FormControl fullWidth>
                  <small>Select Role</small>
                  <Select
                    sx={{mt: 1}}
                    id="role"
                    size='small'
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <MenuItem value='user'>user</MenuItem>
                    <MenuItem value='admin'>admin</MenuItem>
                  </Select>
                </FormControl>

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

export default UserUpdate
