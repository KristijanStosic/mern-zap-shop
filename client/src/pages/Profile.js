import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
  Typography,
  TextField,
  Grid,
  Button,
} from '@mui/material'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { updateProfileError, success } = userUpdateProfile

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(updateUserProfile({ id: user._id, name, email }))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile')) // getting logged in user
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user])

  return (
    <>
      <Meta title={'Profile Page'} />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant='h4'>Update Profile</Typography>
          {loading ? (
            <Loading message='Fetching user informations...' />
          ) : (
            <>
              {success && <Alert severity='success'>Profile Updated</Alert>}
              {error && <Alert severity='error'>{error}</Alert>}
              {updateProfileError && <Alert severity='error'>{updateProfileError}</Alert>}
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
                margin='normal'
                fullWidth
                value={new Date(userInfo.user.createdAt).toLocaleString('LL')}
                autoComplete='createdAt'
                id='createdAt'
                label='Registered on'
                type='createdAt'
                name='createdAt'
              />
              <Button
                onClick={submitHandler}
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={loading ? true : false}
              >
                UPDATE PROFILE
              </Button>

              <Button
                component={Link}
                to='/update-password'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                CHANGE PASSWORD
              </Button>
            </>
          )}
        </Grid>
        {/* ORDERS */}
        <Grid item xs={9}>
          <Typography variant='h4'>My orders</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default Profile
