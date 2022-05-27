import React from 'react'
import { useSelector } from 'react-redux'
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

const CartSummary = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  
  // will return 0 if left side is null or undefined
  const total = cartItems.reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.price, 0 ) ?? 0 

  return (
    <>
      <TableContainer component={Paper} variant={'outlined'}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal ({cartItems.length}) items</TableCell>
              <TableCell align='right'>${(total).toFixed(2)}</TableCell>
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
