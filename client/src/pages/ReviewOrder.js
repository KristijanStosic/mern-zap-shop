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
import CheckoutSteps from './CheckoutSteps'
import { createOrder } from '../redux/actions/orderActions'
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants'
import { USER_DETAILS_RESET } from '../redux/constants/userConstants'

const ReviewOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  if (!cart.shippingAddress.address) {
    navigate('/shipping')
  } else if (!cart.paymentMethod) {
    navigate('/payment')
  }

  const orderCreate = useSelector((state) => state.orderCreate)
  const { success, error } = orderCreate

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  // will return 0 if left side is null or undefined
  cart.itemsPrice =
    addDecimals(
      Number(
        cartItems.reduce(
          (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
          0
        )
      )
    ) ?? 0

  // if order is > $100 shipping is 0, else $3
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 3)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2))) // 15% taxPrice price
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  useEffect(() => {
    if (success) {
      navigate('/payment')
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [navigate, success])

  const placeOrderHandler = (e) => {
    e.preventDefault()
    const orderData = {
      orderItems: cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }
    dispatch(createOrder(orderData))
    navigate('/payment')

    sessionStorage.setItem('orderInfo', JSON.stringify(orderData))
  }

  /*const proceedToPayment = async () => {
    const data = {
      orderItems: cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }

    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    navigate('/payment')
  }*/

  return (
    <>
      <Meta title={'Review Order Page'} />
      <CheckoutSteps shipping paymentMethod reviewOrder />
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
                        {cartItem.quantity} x ${cartItem.price.toFixed(2)} = $
                        {cartItem.quantity * cartItem.price.toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary='Items' />
                  <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                    ${cart.itemsPrice}
                  </Typography>
                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary='Shipping' />
                  <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                    ${cart.shippingPrice}
                  </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary='Tax' />
                  <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                    ${cart.taxPrice}
                  </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary='Total' />
                  <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                    ${cart.totalPrice}
                  </Typography>
                </ListItem>
                <ListItem>
                  {error && <Alert severity='erro'>{error}</Alert>}
                </ListItem>
              </List>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                  Shipping Address
                </Typography>
                <Typography gutterBottom>
                  {cart.shippingAddress.firstName}{' '}
                  {cart.shippingAddress.lastName}
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
              <Grid
                item
                container
                direction='column'
                xs={12}
                sm={6}
              >
                <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                  Method: {cart.paymentMethod}
                </Typography>
                <Button
                  type='button'
                  sx={{ mt: 2 }}
                  variant='contained'
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  {/* PROCEED TO PAYMENT */}
                  PLACE ORDER
                </Button>
              </Grid>
            </Grid>
          </Paper>
      </Container>
    </>
  )
}

export default ReviewOrder
