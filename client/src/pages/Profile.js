import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
  Typography,
  TextField,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell, 
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions'
import { getMyOrders } from '../redux/actions/orderActions'

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

  const myOrders = useSelector((state) => state.myOrders)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders

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
        dispatch(getMyOrders())
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
          {loadingOrders ? <Loading message='Loading my orders...' /> : errorOrders ? <Alert severity='error'>{errorOrders}</Alert> : (
            <TableContainer sx={{ mt: 2}} component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">DATE</TableCell>
                  <TableCell align="right">TOTAL PRICE</TableCell>
                  <TableCell align="right">PAID</TableCell>
                  <TableCell align="right">DELIVERED</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell component="th" scope="row">
                      {order._id}
                    </TableCell>
                    <TableCell align="right">{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell align="right">${order.totalPrice}</TableCell>
                    <TableCell align="right">{order.isPaid ? order.paidAt.substring(0, 10) : (
                      <ClearIcon style={{ color: 'red'}} />
                    )}</TableCell>
                    <TableCell align="right">{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                      <ClearIcon style={{ color: 'red'}} />
                    )}</TableCell>
                    <TableCell align="center"><IconButton  component={Link} to={`/order/${order._id}`}><VisibilityIcon style={{ color: 'teal'}} /></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Profile
