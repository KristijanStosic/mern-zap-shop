import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import Meta from '../components/Meta'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import PayButton from '../components/PayButton'
import { getOrderById } from '../redux/actions/orderActions'

const Order = ({ cartItems }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const orderId = params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [dispatch, orderId])

  /*const successPaymentHandler = (paymentInfo) => {
    console.log(paymentInfo);
    dispatch(updateOrderToPaid(orderId, paymentInfo))
  }*/

  return (
    <>
      <Meta title={'Order Page'} />
      {loading ? (
        <Loading message='Loading order...' />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Container component='main' maxWidth='sm'>
                <Paper
                  variant='outlined'
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                  <Typography variant='h3'>Order Informations</Typography>
                  <Divider sx={{ m: 1 }} />
                  <Typography variant='h6'>Order #{order._id}</Typography>
                  {order.orderItems.length === 0 ? (
                    <Alert severity='error'>Your cart is empty!</Alert>
                  ) : (
                    <List disablePadding>
                      {order &&
                        order.orderItems.map((orderItem, index) => (
                          <ListItem key={index} sx={{ py: 1, px: 0 }}>
                            <img
                              src={orderItem.image}
                              alt={orderItem.name}
                              style={{ height: 50, marginRight: 20 }}
                            />
                            <ListItemText primary={orderItem.name} />
                            <Typography variant='body2'>
                              {orderItem.quantity} x $
                              {orderItem.price.toFixed(2)} = $
                              {orderItem.quantity * orderItem.price.toFixed(2)}
                            </Typography>
                          </ListItem>
                        ))}

                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary='Items' />
                        <Typography
                          variant='subtitle1'
                          sx={{ fontWeight: 700 }}
                        >
                          ${order.itemsPrice}
                        </Typography>
                      </ListItem>

                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary='Shipping' />
                        <Typography
                          variant='subtitle1'
                          sx={{ fontWeight: 700 }}
                        >
                          ${order.shippingPrice}
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary='Tax' />
                        <Typography
                          variant='subtitle1'
                          sx={{ fontWeight: 700 }}
                        >
                          ${order.taxPrice}
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary='Total' />
                        <Typography
                          variant='subtitle1'
                          sx={{ fontWeight: 700 }}
                        >
                          ${order.totalPrice}
                        </Typography>
                      </ListItem>
                      <ListItemText disablePadding>
                        <strong>Order date: </strong>{' '}
                        {new Date(order.createdAt).toLocaleString('LL')}
                      </ListItemText>
                    </List>
                  )}
                </Paper>
              </Container>
            </Grid>
            <Grid item xs={6}>
              <Container component='main' maxWidth='sm'>
                <Paper
                  variant='outlined'
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                  <Typography variant='h3'>Shipping Address</Typography>
                  <Divider sx={{ mt: 1 }} />
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                    aria-label='contacts'
                  >
                    <ListItem disablePadding>
                      {order.shippingAddress.firstName}{' '}
                      {order.shippingAddress.lastName}
                    </ListItem>
                    <ListItem disablePadding>
                      {order.shippingAddress.address}
                    </ListItem>
                    <ListItem disablePadding>
                      {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.city}
                    </ListItem>
                    <ListItem disablePadding>
                      {order.shippingAddress.country}
                    </ListItem>
                  </List>
                  {order.isDelivered ? (
                    <Alert severity='success'>
                      Delivered on: {order.deliveredAt}
                    </Alert>
                  ) : (
                    <Alert severity='error'>Not Delivered</Alert>
                  )}
                  <Divider sx={{ mt: 1 }} />
                  <Typography variant='h4'>Payment Method</Typography>
                  <ListItem disablePadding>{order.paymentMethod}</ListItem>
                  {order.isPaid ? (
                    <Alert severity='success'>Paid on: {order.paidAt}</Alert>
                  ) : (
                    <Alert severity='error'>Not Paid</Alert>
                  )}

                  {!order.isPaid ? (
                    <PayButton cartItems={order.orderItems} />
                  ) : (
                    ''
                  )}
                </Paper>
              </Container>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Order
