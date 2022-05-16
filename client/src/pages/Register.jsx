import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import axios from 'axios'
import useLocalState from '../utils/localState'
import Alert from '../components/Alert'
import Meta from '../components/Meta'


function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
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
    const { name, email, password } = values
    const registerNewUser = { name, email, password }

    try {
      const { data } = await axios.post(`/api/auth/register`, registerNewUser)
      setSuccess(true)
      setValues({ name: '', email: '', password: '' })
      showAlert({ text: data.msg, type: 'success' })
    } catch (error) {
      const { msg } = error.response.data
      showAlert({ text: msg || 'there was an error' })
    }
    setLoading(false)
  }

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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            REGISTER
          </Typography>
          {alert.show && <Alert severity={alert.type}>{alert.text}</Alert>}
          <Box component='form' onSubmit={onSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              autoComplete='name'
              autoFocus
              id='name'
              label='Name'
              type='name'
              value={values.name}
              name='name'
              onChange={handleChange}
            />
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
              {loading ? 'Loading...' : 'Register'}
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/login' style={{ color: '#333' }}>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Register
