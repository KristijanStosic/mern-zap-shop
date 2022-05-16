import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'
import InputAdornment from '@mui/material/InputAdornment'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Alert from '../components/Alert'
import axios from 'axios'
import useLocalState from '../utils/localState'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const ResetPasswordForm = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const { alert, showAlert, loading, setLoading, success, setSuccess, hide, showPassword } =
    useLocalState()

  const query = useQuery()

  const handleChange = async (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!password) {
      showAlert({ text: 'Please enter password' })
      setLoading(false)
      return
    }
    try {
      const { data } = await axios.post('/api/auth/reset-password', {
        password,
        token: query.get('token'),
        email: query.get('email'),
      })
      setSuccess(true)
      setLoading(false)
      showAlert({
        text: `Success, redirecting to login page shortly`,
        type: 'success',
      })
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (error) {
      showAlert({ text: error.response.data.msg })
      setLoading(false)
    }
  }

  return (
    <>
      <Container component='main' maxWidth='lg'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <KeyIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            RESET PASSWORD
          </Typography>
          {alert.show && <Alert severity={alert.type}>{alert.text}</Alert>}
          {!success && (
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                autoComplete='password'
                autoFocus
                id='password'
                label='Password'
                type={hide ? 'text' : 'password'}
                value={password}
                name='password'
                onChange={handleChange}
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
                {loading ? 'Please Wait...' : 'New Password'}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}

export default ResetPasswordForm
