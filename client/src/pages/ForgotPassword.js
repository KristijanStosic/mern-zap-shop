import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Grid,
  Button,
} from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { forgotPassword } from '../redux/actions/authActions'
import { FORGOT_PASSWORD_RESET } from '../redux/constants/authConstants'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const { error, loading, success } = useSelector((state) => state.forgotPassword)

  useEffect(() => {
    if(success) {
      dispatch({ type: FORGOT_PASSWORD_RESET })
      toast.info('Please check your email for link reset')
    }

    if (error) {
      toast.error(error)
    }
  }, [dispatch, error, success])


  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('email', email)
    dispatch(forgotPassword(formData))
  }

  return (
    <>
      <Container component='main'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            FORGOT PASSWORD
          </Typography>
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
              autoComplete='email'
              autoFocus
              id='email'
              label='Email'
              type='email'
              value={email}
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={loading ? true : false}
            >
              Get Reset Password Link
            </Button>
            <Grid container>
              <Grid item xs>
                <Button component={Link} to='/login'>
                  Already have an account? Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default ForgotPassword
