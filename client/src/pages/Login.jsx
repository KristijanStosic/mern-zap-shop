import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useLocalState from '../utils/localState'
import axios from 'axios'
import Alert from '../components/Alert'
import Meta from '../components/Meta'


function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const { saveUser } = useGlobalContext()
  const {
    alert,
    showAlert,
    loading,
    setLoading,
    hideAlert,
    hide,
    showPassword,
  } = useLocalState()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    hideAlert()
    setLoading(true)
    const { email, password } = values
    const loginUser = { email, password }
    try {
      const { data } = await axios.post(`/api/auth/login`, loginUser)
      setValues({ name: '', email: '', password: '' })
      showAlert({
        text: `Welcome, ${data.user.name}. Redirecting to dashboard...`,
        type: 'success',
      })
      setLoading(false)
      saveUser(data.user)
      navigate('/')
    } catch (error) {
      showAlert({ text: error.response.data.msg })
      setLoading(false)
    }
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
        {alert.show && <Alert severity={alert.type}>{alert.text}</Alert>}
        <Box component='form' onSubmit={onSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            autoComplete='email'
            autoFocus
            id='email'
            label='Email'
            type='email'
            value={values.email}
            name='email'
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            autoComplete='password'
            autoFocus
            id='password'
            label='Password'
            type={hide ? 'text' : 'password'}
            value={values.password}
            name='password'
            onChange={handleChange}
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
              <Link to='/register' style={{ color: '#333' }}>
                Don't have an account? Register
              </Link>
            </Grid>
            <Grid item>
              <Link to='/forgot-password' style={{ color: '#333' }}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </>
  )
}

export default Login
