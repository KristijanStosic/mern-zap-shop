import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//import { useParams } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@mui/material'
import axios from 'axios'


const PayButton = ({ cartItems }) => {
  const [stripeApiKey, setStripeApiKey] = useState('')

  //const orderDetails = useSelector((state) => state.orderDetails)
  //const { order, success, error } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/stripe/stripe-api-key', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  }, [userInfo.token])

  const handleCheckout = () => {
    axios
      .post(`/api/stripe/create-checkout-session`, {
        cartItems,
        userId: userInfo.user.userId,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url
        }
      })
      .catch((err) => console.log(err.message))
  }

  return (
    <>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Button sx={{ mt: 2}} variant='contained' color='primary' onClick={() => handleCheckout()}>PAY</Button>
        </Elements>
      )}
    </>
  )
}

export default PayButton
