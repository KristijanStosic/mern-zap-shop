import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import axios from 'axios'

const PayButton = ({ order }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleCheckout = () => {
    axios
      .post(`/api/stripe/create-checkout-session`, {
        order,
        user: userInfo.user.id,
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
      <Button
        sx={{ mt: 2 }}
        variant='contained'
        color='primary'
        style={{
          display: 'inline-block',
          width: '100%',
          padding: '15px',
          color: 'white',
          'font-size': '1.3em',
        }}
        onClick={() => handleCheckout()}
      >
        PAY
      </Button>
    </>
  )
}

export default PayButton
