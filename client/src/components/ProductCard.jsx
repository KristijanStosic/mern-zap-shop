import { useState } from 'react'
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

const ProductCard = ({ product }) => {
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
        title={product.name}
        image={product.image}
      />
      <CardContent>
        <Typography gutterBottom color='primary' variant='h5'>
          $ {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
        >
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