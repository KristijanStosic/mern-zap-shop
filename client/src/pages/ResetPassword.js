import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import KeyIcon from '@mui/icons-material/Key'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Alert from '../components/Alert'
import { useQuery } from '../utils/utils'
import { resetPassword } from '../redux/actions/authActions'
import { RESET_PASSWORD_RESET } from '../redux/constants/authConstants'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const query = useQuery()
  const [hide, setHide] = useState(false)
  const [token] = useState(query.get('token'))
  const [email] = useState(query.get('email'))
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const { loading, error, success } = useSelector(state => state.resetPassword)

  useEffect(() => {
    if(success) {
      dispatch({ type: RESET_PASSWORD_RESET })
      toast.info('Password updated successfully')
    }
  }, [dispatch, success])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.set('token', token)
    formData.set('email', email)
    formData.set('password', password)

    dispatch(resetPassword(formData))
  }

  const showPassword = (e) => {
    e.preventDefault()
    setHide(!hide)
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
          {error && (
            <Alert severity='error'>{error}</Alert>
          )}
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
                onChange={(e) => setPassword(e.target.value)}
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
                SET NEW PASSWORD
              </Button>
            </Box>
        </Box>
      </Container>
    </>
  )
}

export default ResetPassword
