import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import ReadMore from '../components/ReadMore'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import Rating from '../components/Rating'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../redux/actions/productActions'

const ProductDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()


  const productDetails = useSelector((state) => state.productDetails)

  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?quantity=${quantity}`)
  }

  if (loading) return <Loading message='Loading product...' />

  return (
    <>
      {error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <>
          <Meta title={product.name} />
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h3'>{product.name}</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant='h5' color='primary.dark'>
                Price: ${product.price.toFixed(2)}
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                  <TableRow>
                      <TableCell>SKU</TableCell>
                      <TableCell>{product.sku}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{product.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rating</TableCell>
                      <TableCell>
                      <Rating value={product.averageRating} text={` (${product.numOfReviews})  reviews`} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell><ReadMore>{product.description}</ReadMore></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Stock</TableCell>
                      <TableCell>
                        {product.countInStock > 0
                          ? 'AVAILABLE'
                          : 'OUT OF STOCK'}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Players</TableCell>
                      <TableCell>
                        {product.minPlayers} - {product.maxPlayers}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Game length</TableCell>
                      <TableCell>
                        {product.gameLength} minutes
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Age</TableCell>
                      <TableCell>{product.suggestedAge}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Designer</TableCell>
                      <TableCell>{product.designer}</TableCell>
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
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>{product.category}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {product.countInStock > 0 && (
                  <>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='quantity'>Quantity</InputLabel>
                        <Select
                          label='Quantity'
                          id='quantity'
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        sx={{ height: '55px' }}
                        color='primary'
                        size='large'
                        variant='contained'
                        fullWidth
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        ADD TO CART
                      </Button>
                    </Grid>{' '}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default ProductDetails
