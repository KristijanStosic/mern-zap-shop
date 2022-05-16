import { useEffect, useState } from 'react'
import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { currencyFormat } from '../utils/utils'
import axios from 'axios'
import ReadMore from './ReadMore'
import Loading from './Loading'
import Meta from '../components/Meta'

const ProductDetails = () => {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(0)

  const getProductDetails = async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      console.log(data)
      setProduct(data.product)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getProductDetails(id)
    }, 1000)
  }, [id])

  

  if (!product) return <Loading message='Loading product...' />

  return (
    <>
    <Meta title={product.name} />
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.image} alt={product.name} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>
          {currencyFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>
                  <ReadMore>{product.description}</ReadMore>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>
                  {product.countInStock > 0 ? 'AVAILABLE' : 'OUT OF STOCK'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>{product.sku}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Players</TableCell>
                <TableCell>
                  {product.minPlayers} - {product.maxPlayers}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Age</TableCell>
                <TableCell>{product.suggestedAge}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Origin country</TableCell>
                <TableCell>{product.originCountry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Language dependence</TableCell>
                <TableCell>{product.languageDependence}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Language of publication</TableCell>
                <TableCell>{product.languageOfPublication}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in Cart'
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              sx={{ height: '55px' }}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
            >
              {/* {item ? 'Update Quantity' : 'Add to Cart'} */}UPDATE
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  )
}

export default ProductDetails
