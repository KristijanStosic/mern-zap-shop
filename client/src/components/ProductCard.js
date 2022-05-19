import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity] = useState(1)

  const productId = product.id

  useEffect(() => {}, [])

  const addToCartHandler = () => {
    dispatch(addToCart(productId, quantity))
    navigate('/cart')
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.light' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.dark' },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'contain',
        }}
        component={Link}
        to={`/products/${product.id}`}
        title={product.name}
        image={product.image}
      />
      <CardContent>
        <Typography gutterBottom color='primary' variant='h5'>
          ${(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={addToCartHandler}>
          Add to cart
        </Button>
        <Button component={Link} to={`/products/${product.id}`} size='small'>
          View
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
