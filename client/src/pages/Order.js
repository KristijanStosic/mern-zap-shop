import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Typography,
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material'
import Meta from '../components/Meta'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import PayButton from '../components/PayButton'
import {
  getOrderById,
  updateOrderToDelivered,
} from '../redux/actions/orderActions'
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../redux/constants/orderConstants'

const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const orderId = params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }

    if (!order || successDeliver || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderById(orderId))
    }
  }, [dispatch, orderId, successDeliver, order, userInfo, navigate, successPay])

  const deliverHandler = () => {
    dispatch(updateOrderToDelivered(order))
  }

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
                    <List>
                      {order &&
                        order.orderItems.map((orderItem, index) => (
                          <ListItem key={index} sx={{ py: 1, px: 0 }}>
                            <img
                              src={orderItem.image?.url}
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
                      <ListItemText>
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
                    <ListItem>
                      {order.shippingAddress.firstName}{' '}
                      {order.shippingAddress.lastName}
                    </ListItem>
                    <ListItem>{order.shippingAddress.address}</ListItem>
                    <ListItem>
                      {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.city}
                    </ListItem>
                    <ListItem>{order.shippingAddress.country}</ListItem>
                  </List>
                  {order.isDelivered ? (
                    <Alert severity='success'>
                      Delivered on:{' '}
                      {new Date(order.deliveredAt).toLocaleDateString('LL')}
                    </Alert>
                  ) : (
                    <Alert severity='error'>Not Delivered</Alert>
                  )}
                  {loadingDeliver && <Loading message='Updating order...' />}
                  {userInfo &&
                    userInfo.user.role === 'admin' &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <Button
                        style={{
                          display: 'inline-block',
                          width: '100%',
                          padding: '15px',
                          color: 'white',
                          'font-size': '1.3em',
                        }}
                        type='button'
                        variant='contained'
                        color='primary'
                        onClick={deliverHandler}
                        sx={{ mt: 2 }}
                      >
                        MARK AS DELIVERED
                      </Button>
                    )}
                  <Divider sx={{ mt: 1 }} />
                  <Typography variant='h4'>Payment Method</Typography>
                  <ListItem>{order.paymentMethod}</ListItem>
                  {loadingPay && <Loading message='Loading...' />}
                  {errorPay && <Alert severity='error'>{errorPay}</Alert>}
                  {order.isPaid ? (
                    <Alert severity='success'>
                      Paid on: {new Date(order.paidAt).toLocaleDateString('LL')}
                    </Alert>
                  ) : (
                    <Alert severity='error'>Not Paid</Alert>
                  )}
                  {userInfo &&
                    userInfo.user.role === 'user' &&
                    !order.isPaid && <PayButton order={order} />}
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
