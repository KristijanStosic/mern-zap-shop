import React, { useState } from 'react';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Grid,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom';
import axios from 'axios';
import useLocalState from '../utils/localState';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Alert from '../components/Alert'



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    hideAlert();
    if (!email) {
      showAlert({
        text: 'Please provide email',
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post('/api/auth/forgot-password', {
        email,
      });
      showAlert({ text: data.msg, type: 'success' });
      setSuccess(true);
    } catch (error) {
      showAlert({
        text: 'Something went wrong, please try again',
      });
      setSuccess(true);
    }
    setLoading(false);
  };
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
        {alert.show && <Alert severity={alert.type}>{alert.text}</Alert>}
        {!success && <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Please Wait...' : 'Get Reset Password Link'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/login' style={{ color: '#333'}}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>}
      </Box>
    </Container>
    </>

  );
};

export default ForgotPassword;
