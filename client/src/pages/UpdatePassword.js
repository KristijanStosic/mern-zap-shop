import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@mui/material'
import Alert from '../components/Alert'
import Meta from '../components/Meta'
import Loading from '../components/Loading'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { USER_UPDATE_PASSWORD_RESET } from '../redux/constants/userConstants'
import { updateUserPassword } from '../redux/actions/userActions'

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword)
  const { loading, error, msg } = userUpdatePassword

  const updatePasswordHandler = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match')
    } else {
      const formData = new FormData()
      formData.set('oldPassword', oldPassword)
      formData.set('newPassword', newPassword)
      formData.set('confirmPassword', confirmPassword)
      dispatch(updateUserPassword(formData))
    }
  }

  useEffect(() => {
    dispatch({
      type: USER_UPDATE_PASSWORD_RESET
    })
  }, [dispatch, error, navigate])

  return (
    <>
      <Meta title={'Update Password Page'} />
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
            UPDATE PASSWORD
          </Typography>
          {message && <Alert severity='error'>{message}</Alert>}
          {error && <Alert severity='error'>{error}</Alert>}
          {msg && <Alert severity='success'>{msg}</Alert>}
          {loading ? (
            <Loading message='Updating password...' />
          ) : (
            <>
              <Box
                component='form'
                onSubmit={updatePasswordHandler}
                noValidate
                sx={{ mt: 2 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoFocus
                  autoComplete='oldPassword'
                  id='oldPassword'
                  label='Old Password'
                  type='password'
                  value={oldPassword}
                  name='oldPassword'
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  autoComplete='newPassword'
                  id='newPassword'
                  label='New Password'
                  type='password'
                  value={newPassword}
                  name='newPassword'
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ mt: 2, mb: 1 }}
                />
                <TextField
                  required
                  fullWidth
                  autoComplete='confirmPassword'
                  id='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  value={confirmPassword}
                  name='confirmPassword'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mt: 2, mb: 1 }}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'UPDATE PASSWORD'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </>
  )
}

export default UpdatePassword
