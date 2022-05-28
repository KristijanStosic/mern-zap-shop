import React from 'react'
import {
  Container,
  Paper,
  Divider,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material'
import CheckoutSteps from '../pages/CheckoutSteps'
import Meta from '../components/Meta'

const Payment = () => {
  return (
    <>
      <Meta title={'Shipping'} />
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='cardName'
                label='Name on card'
                fullWidth
                autoComplete='cc-name'
                variant='standard'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id='cardNumber'
                label='Card number'
                fullWidth
                autoComplete='cc-number'
                variant='standard'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id='expDate'
                label='Expiry date'
                fullWidth
                autoComplete='cc-exp'
                variant='standard'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id='cvv'
                label='CVV'
                helperText='Last three digits on signature strip'
                fullWidth
                autoComplete='cc-csc'
                variant='standard'
              />
            </Grid>
          </Grid>
          <Box
            component='form'
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button type='submit' variant='contained' sx={{ mt: 3, ml: 1 }}>
              PAY NOW
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default Payment
