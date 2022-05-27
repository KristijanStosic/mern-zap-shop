import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Container,
  Paper,
  Divider,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import Meta from '../components/Meta'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import CheckoutSteps from '../pages/CheckoutSteps'
import { createOrder } from '../redux/actions/orderActions'

const PlaceOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const orderCreate = useSelector((state) => state.orderCreate)
  const { success, error, loading } = orderCreate

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  // will return 0 if left side is null or undefined
  cart.itemsPrice =
    addDecimals(Number(cartItems.reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.price, 0))) ?? 0

  // if order is > $100 shipping is 0, else $3
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 3)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2))) // 15% taxPrice price
  cart.totalPrice = (
      Number(cart.itemsPrice) + 
      Number(cart.shippingPrice) + 
      Number(cart.taxPrice)
    ).toFixed(2)

  const placeOrderHandler = async (e) => {
    e.preventDefault()
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  useEffect(() => {
    if (success) {
      navigate(`/order-success`)
    }
  }, [success, navigate])

  return (
    <>
      <Meta title={'Place Order Page'} />
      <CheckoutSteps shipping paymentMethod placeOrder />
      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Divider />

        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant='h6' gutterBottom>
            Order Summary
          </Typography>
          {cartItems.length === 0 ? (
            <Alert severity='error'>Your cart is empty</Alert>
          ) : (
            <List disablePadding>
              {cartItems &&
                cartItems.map((cartItem, index) => (
                  <ListItem key={index} sx={{ py: 1, px: 0 }}>
                    <img
                      src={cartItem.image}
                      alt={cartItem.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <ListItemText primary={cartItem.name} />
                    <Typography variant='body2'>
                      {cartItem.quantity} x ${(cartItem.price).toFixed(2)}{' '}
                      = ${cartItem.quantity * (cartItem.price).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary='Items' />
                <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                  ${(cart.itemsPrice)}
                </Typography>
              </ListItem>

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary='Shipping' />
                <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                  ${(cart.shippingPrice)}
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary='Tax' />
                <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                  ${(cart.taxPrice)}
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary='Total' />
                <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                  ${(cart.totalPrice)}
                </Typography>
              </ListItem>
            </List>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                Shipping Address
              </Typography>
              <Typography gutterBottom>
                {cart.shippingAddress.firstName} {cart.shippingAddress.lastName}
              </Typography>
              <Typography gutterBottom>
                {cart.shippingAddress.phoneNumber}
              </Typography>
              <Typography gutterBottom>
                {cart.shippingAddress.address}
              </Typography>
              <Typography gutterBottom></Typography>
              <Typography gutterBottom>
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.city}
              </Typography>
              <Typography gutterBottom>
                {cart.shippingAddress.country}
              </Typography>
            </Grid>
            <Grid item container direction='column' xs={12} sm={6}>
              <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                Method: {cart.paymentMethod}
              </Typography>
              {error && <Alert severity='error'>{error}</Alert>}
              {loading ? (
                <Loading message='Creating order...' />
              ) : (
                <Button
                  sx={{ mt: 2 }}
                  type='button'
                  onClick={placeOrderHandler}
                  variant='contained'
                  disabled={cartItems.length === 0}
                >
                  PLACE ORDER
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default PlaceOrder
