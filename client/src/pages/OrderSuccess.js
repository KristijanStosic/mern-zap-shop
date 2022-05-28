import { useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Paper, Typography, Button } from '@mui/material'
//import { getOrderById } from '../redux/actions/orderActions'


const OrderSuccess = () => {
  //const dispatch = useDispatch()

  //const orderDetails = useSelector((state) => state.orderDetails)
  //const { order } = orderDetails

  useEffect(() => {
  }, [])

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
            Your order number is #. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
          <Button component={Link} to={`/order/myorders`} variant='contained' color='primary' sx={{ mt: 2}}>View Order</Button>
        </>
      </Paper>
    </Container>
  )
}

export default OrderSuccess
