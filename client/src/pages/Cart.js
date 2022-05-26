import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../redux/actions/cartActions'
import { useQuery } from '../utils/utils'
import Alert from '../components/Alert'
import CartSummary from '../components/CartSummary'

const Cart = () => {
  const navigate = useNavigate()
  const query = useQuery()
  const params = useParams()
  const dispatch = useDispatch()
  
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const productId = params.id
  const quantity = Number(query.get('quantity'))

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <Alert severity='error' size='medium'>
            Your cart is empty!{' '}
          </Alert>
          <Button
            variant='contained'
            component={Link}
            to='/products'
            sx={{ mt: 2 }}
          >
            Go back!
          </Button>
        </>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align='right'>Price</TableCell>
                  <TableCell align='center'>Quantity</TableCell>
                  <TableCell align='right'>Subtotal</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems &&
                  cartItems.map((cartItem) => (
                    <TableRow
                      key={cartItem.product}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        <Box display='flex' alignItems='center'>
                          <img
                            src={cartItem.image}
                            alt={cartItem.name}
                            style={{ height: 50, marginRight: 20 }}
                          />
                          <span>
                            <Button
                              component={Link}
                              to={`/products/${cartItem.product}`}
                            >
                              {cartItem.name}
                            </Button>
                          </span>
                        </Box>
                      </TableCell>
                      <TableCell align='right'>
                        ${(cartItem.price / 100).toFixed(2)}
                      </TableCell>
                      <TableCell align='center'>
                      <FormControl fullWidth>
                        <Select
                          id='quantity'
                          value={cartItem.quantity}
                          size='small'
                          onChange={(e) => dispatch(addToCart(cartItem.product, Number(e.target.value)))}
                        >
                          {[...Array(cartItem.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      </TableCell>
                      <TableCell align='right'>
                        $
                        {((cartItem.price / 100) * cartItem.quantity).toFixed(
                          2
                        )}
                      </TableCell>
                      <TableCell align='right'>
                        <Button color='error' onClick={() => removeFromCartHandler(cartItem.product)}>
                          <Delete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <CartSummary />
              <Button
                variant='contained'
                size='large'
                fullWidth
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Cart
