import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
  IconButton,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { getOrders } from '../redux/actions/orderActions'

const OrderList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(userInfo && userInfo.user.role === 'admin') {
        dispatch(getOrders())
    } else {
        navigate('/login')
    }
  }, [dispatch, navigate, userInfo]) 

  return <>
    <Meta title={'Admin Order List Page'} />

    {loading ? <Loading message='Loading orders...' /> : 
     error ? <Alert severity='error'>{error}</Alert> : (
       <Grid container spacing={2}>
        <Grid item xs={12}>
        <Typography variant='h4'>ORDERS</Typography>
          <TableContainer sx={{ mt: 2}} component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">USER</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">TOTAL</TableCell>
                <TableCell align="center">PAID</TableCell>
                <TableCell align="center">DELIVERED</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>
                  <TableCell align="center">{order.user && order.user.name}</TableCell>
                  <TableCell align="center">{order.createdAt.substring(0, 10)}</TableCell>
                  <TableCell align="center">{order.totalPrice}</TableCell>
                  <TableCell align="center">{order.isPaid ? order.paidAt.substring(0, 10) : (
                      <ClearIcon style={{ color: 'red'}} />
                    )}</TableCell>
                    <TableCell align="center">{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                      <ClearIcon style={{ color: 'red'}} />
                    )}</TableCell>
                    <TableCell align="center"><IconButton component={Link} to={`/order/${order._id}`}><VisibilityIcon style={{ color: 'teal'}} /></IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      </Grid>
     )}
     
  </>
}

export default OrderList
