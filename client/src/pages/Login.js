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
import Alert from '../components/Alert'
import Meta from '../components/Meta'
import Loading from '../components/Loading'
import InputAdornment from '@mui/material/InputAdornment'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useLocalState from '../utils/localState'
import { login } from '../actions/authActions'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const { hide, showPassword } = useLocalState()

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [dispatch, userInfo, navigate])

  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <Meta title={'Login Page'} />
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            LOGIN
          </Typography>

          {error && (
            <Alert severity='error'>{error}</Alert>
          )}
          {loading ? (
            <Loading message='Logging...' />
          ) : (
            <>
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
                  autoFocus
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

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Login'}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Button component={Link} to='/register'>
                      Don't have an account? Register
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={Link} to='/forgot-password'>
                      Forgot password?
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

export default Login
