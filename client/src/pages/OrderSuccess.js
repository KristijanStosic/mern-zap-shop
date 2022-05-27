import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Paper, Typography, Button } from '@mui/material'

const OrderSuccess = () => {
  return (
    <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
      <Paper
        variant='outlined'
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <>
        
          <Typography variant='h5' gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant='subtitle1'>
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
          <Button component={Link} to={`/orders/myorders`} variant='contained' color='primary' sx={{ mt: 2}}>Go to Orders</Button>
        </>
      </Paper>
    </Container>
  )
}

export default OrderSuccess
