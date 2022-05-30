import React, { useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  Divider,
  Typography,
  Box,
} from '@mui/material'
import PayButton from '../components/PayButton'
import CheckoutSteps from '../pages/CheckoutSteps'
import Meta from '../components/Meta'

const Payment = () => {
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress } = cart

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment-method')
    }
  }, [cart.paymentMethod, navigate, shippingAddress.address])

  return (
    <Fragment>
      <Meta title={'Payment Page'} />
      <CheckoutSteps shipping paymentMethod placeOrder payment />

      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Divider />

        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant='h6' gutterBottom>
            Payment
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <PayButton cartItems={cartItems} />
          </Box>
        </Paper>
      </Container>
    </Fragment>
  )
}

export default Payment
