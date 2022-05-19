import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useLocalState from '../utils/localState'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { register } from '../actions/authActions'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const { hide, showPassword } = useLocalState()

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
      navigate('/')
      /*setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')*/
    }
  }

  useEffect(() => {

  }, [dispatch, userInfo, navigate])

  return (
    <>
      <Meta title={'Register Page'} />
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {message && <Alert severity='error'>{message}</Alert>}
          {error && <Alert severity='error'>{error}</Alert>}
          {loading ? (
            <Loading message='Registering new user...' />
          ) : (
            <>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <AccountCircleIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                REGISTER
              </Typography>
              {/* {confirmMessage &&  <Alert severity='success'>{confirmMessage}</Alert>} */}
              <Box
                component='form'
                onSubmit={onSubmit}
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
                  value={name}
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='email'
                  id='email'
                  label='Email'
                  type='email'
                  value={email}
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  autoComplete='password'
                  id='password'
                  label='Password'
                  type={hide ? 'text' : 'password'}
                  value={password}
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mt: 2, mb: 1 }}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={showPassword}>
                        <InputAdornment position='end'>
                          {hide ? <Visibility /> : <VisibilityOff />}
                        </InputAdornment>
                      </IconButton>
                    ),
                  }}
                />

                <TextField
                  required
                  fullWidth
                  autoComplete='confirmPassword'
                  id='confirmPassword'
                  label='Confirm Password'
                  type={hide ? 'text' : 'password'}
                  value={confirmPassword}
                  name='confirmPassword'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mt: 2, mb: 1 }}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={showPassword}>
                        <InputAdornment position='end'>
                          {hide ? <Visibility /> : <VisibilityOff />}
                        </InputAdornment>
                      </IconButton>
                    ),
                  }}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading ? true : false}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item>
                    <Button component={Link} to='/login'>
                      Already have an account? Login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </>
  )
}

export default Register
