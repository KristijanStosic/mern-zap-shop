import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Grid,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import Alert from '../components/Alert'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { forgotPassword, clearErrors } from '../actions/authActions'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const { error, loading, msg } = useSelector((state) => state.forgotPassword)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, msg])


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
          {msg && <Alert severity='success'>{msg}</Alert>}
          
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
