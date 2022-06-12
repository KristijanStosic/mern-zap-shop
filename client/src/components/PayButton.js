import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { updateOrderToPaid, getOrderById } from '../redux/actions/orderActions'

const PayButton = ({ cartItems }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderId = params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order } = orderDetails

  useEffect(() => {

  }, [])

  const handleCheckout = () => {
    axios.post(`/api/stripe/create-checkout-session`, {
        totalPrice: order.totalPrice,
        orderItems: order.orderItems,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        user: userInfo.user.id,
      }).then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url
        }
      }).catch((err) => console.log(err.message))
  }

  return (
    <>
      <Button
        sx={{ mt: 2 }}
        variant='contained'
        color='primary'
        onClick={() => handleCheckout()}
      >
        PAY
      </Button>
    </>
  )
}

export default PayButton
