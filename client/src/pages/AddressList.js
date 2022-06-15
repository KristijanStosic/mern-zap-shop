import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { getAllAddresses } from '../redux/actions/addressActions'

const AddressList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addressList = useSelector((state) => state.addressList)
  const { loading, error, addresses } = addressList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getAllAddresses())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <>
      <Meta title={'Admin Address List Page'} />
      {loading ? (
        <Loading message='Loading addresses...' />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='h4'>ADDRESSES</Typography>
              </Grid>
            </Grid>
            <TableContainer sx={{ mt: 2 }} component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align='center'>STREET</TableCell>
                    <TableCell align='center'>CITY</TableCell>
                    <TableCell align='center'>POSTAL CODE</TableCell>
                    <TableCell align='center'>COUNTRY</TableCell>
                    <TableCell align='center'>USER</TableCell>
                    <TableCell align='center'>EMAIL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses.map((address) => (
                    <TableRow key={address._id}>
                      <TableCell component='th' scope='row'>
                        {address._id}
                      </TableCell>
                      <TableCell align='center'>{address.street}</TableCell>
                      <TableCell align='center'>{address.city}</TableCell>
                      <TableCell align='center'>{address.postalCode}</TableCell>
                      <TableCell align='center'>{address.country}</TableCell>
                      <TableCell align='center'>{address.user.name}</TableCell>
                      <TableCell align='center'>{address.user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default AddressList
