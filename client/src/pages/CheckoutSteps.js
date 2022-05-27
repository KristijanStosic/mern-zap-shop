import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Button,
} from '@mui/material'

const CheckoutSteps = ({ shipping, paymentMethod, placeOrder, payment }) => {
  return (
    <Container component='main' maxWidth='sm' sx={{ aligntItems: 'center', justifyContent: 'center', display: 'flex', mb: 2 }}>
      <>
        {shipping ? (
          <Button component={Link} to='/shipping' style={{ backgroundColor: 'transparent'}} disableRipple color='primary'>
            1 Shipping Address
          </Button>
        ) : (
          <Button color='primary' disabled>
            1 Shipping Address
          </Button>
        )}

        {paymentMethod ? (
          <Button component={Link} to='/payment-method' style={{ backgroundColor: 'transparent'}} disableRipple color='primary'>
            2 Payment Method
          </Button>
        ) : (
          <Button color='primary' disabled>
            2 Payment Method
          </Button>
        )}

        {placeOrder ? (
          <Button component={Link} to='/place-order' style={{ backgroundColor: 'transparent'}} disableRipple color='primary'>
            3 Review Order
          </Button>
        ) : (
          <Button color='primary' disabled>
            3 Review Order
          </Button>
        )}

        {payment ? (
          <Button component={Link} to='/payment' style={{ backgroundColor: 'transparent'}} disableRipple color='primary'>
            4 Payment
          </Button>
        ) : (
          <Button color='primary' disabled>
            4 Payment
          </Button>
        )}

      </>
    </Container>
  )
}

export default CheckoutSteps
