import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
  Container,
  Button,
  Box,
  Divider,
} from '@mui/material'
import { savePaymentMethod } from '../redux/actions/cartActions'
import Meta from '../components/Meta'
import CheckoutSteps from '../pages/CheckoutSteps'

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('Stripe')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    navigate('/payment-method')
  }


  const savePaymentMethodHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/place-order')
  }

  return (
    <>
      <Meta title={'Payment Method Page'} />
      <CheckoutSteps shipping paymentMethod />

      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Divider />
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant='h6' gutterBottom>
            Payment Method
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel
                name='paymentMethod'
                value='Stripe'
                id='Stripe'
                control={<Radio />}
                label='Stripe'
                checked 
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
          <Box
            component='form'
            onSubmit={savePaymentMethodHandler}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button type='submit' variant='contained' sx={{ mt: 3, ml: 1 }}>
              Continue
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default PaymentMethod
