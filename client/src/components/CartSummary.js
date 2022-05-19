import { useSelector } from 'react-redux'

import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import { currencyFormat } from '../utils/utils'

const CartSummary = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const subtotal =
    cartItems.reduce(
      (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
      0
    ) ?? 0 // will return 0 if left side is null or undefined

  const taxFee = 100
  const deliveryFee = subtotal > 10000 ? 0 : 500

  return (
    <>
      <TableContainer component={Paper} variant={'outlined'}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal ({cartItems.length}) items</TableCell>
              <TableCell align='right'>{currencyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align='right'>{currencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Tax fee*</TableCell>
              <TableCell align='right'>{currencyFormat(taxFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align='right'>
                {currencyFormat(subtotal + deliveryFee + taxFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: 'italic' }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CartSummary
