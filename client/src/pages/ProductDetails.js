import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
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
  List,
  Box,
  TextField,
} from '@mui/material'
import ReadMore from '../components/ReadMore'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import Rating from '../components/Rating'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../redux/actions/productActions'
import { createReview, getSingleProductReviews } from '../redux/actions/reviewActions'
import { REVIEW_CREATE_RESET } from '../redux/constants/reviewConstants'

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [title, setTitle] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const productId = params.id

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const singleProductReviews = useSelector((state) => state.singleProductReviews)
  const { reviews } = singleProductReviews

  const reviewCreate = useSelector((state) => state.reviewCreate)
  const { error: errorReview, success: successReview } = reviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(!product || product._id !== productId) {
      dispatch(getProductDetails(productId))
      dispatch(getSingleProductReviews(productId))
    }

    if(successReview) {
      alert('Review Submitted')
      setRating(1)
      setComment('')
      setTitle('')
      dispatch({ type: REVIEW_CREATE_RESET })
      dispatch(getSingleProductReviews(productId))
      dispatch(getProductDetails(productId))
    }
  }, [dispatch, productId, product, successReview])

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?quantity=${quantity}`)
  }
  
  const submitReviewHandler = (e) => {
    e.preventDefault()
    dispatch(createReview({product: productId, title, rating, comment }))
  }

  if (loading) return <Loading message='Loading product...' />
  return (
    <>
      {error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <>
          <Meta title={product.name} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img
                src={product.image?.url}
                alt={product.name}
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h3'>{product.name}</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant='h5' color='primary.dark'>
                Price: ${product.price}
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
                      <TableCell>{product.category.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Publisher</TableCell>
                      <TableCell>{product.publisher.name}</TableCell>
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant='h4'>REVIEWS</Typography>
              {reviews && reviews.length === 0 && <Alert severity='info'>No reviews</Alert>}
              <List>
              {reviews && reviews.map((review) => (
                <Fragment key={review._id}>
                <Typography sx={{ mb: 1}} variant='h6'>{review.title}</Typography>
                <Rating value={review.rating} />
                <p>{new Date(review.createdAt).toLocaleDateString('LL')}</p>
                <p>{review.comment}</p>
                <strong>Posted by: {review.user.name}</strong>
                <Divider sx={{ mt: 2, mb: 2}} />
                </Fragment>
              ))}
              </List>
            </Grid>
            <Grid sx={{ mt: 3}} item xs={6}>
                <Typography variant='h4'>Write customer review</Typography>
                {userInfo ? (
                <Box
                  component='form'
                  onSubmit={submitReviewHandler}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                    }}
                  >
                {errorReview && <Alert severity='error'>{errorReview}</Alert>}

                  <FormControl fullWidth>
                  <Typography variant='h6'>Rating</Typography>
                  <Select
                    sx={{ mt: 1, mb: 1 }}
                    id='rating'
                    size='small'
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    displayEmpty
                  >
                    <MenuItem value=''>Select...</MenuItem>
                    <MenuItem value='1'>1 - Poor</MenuItem>
                    <MenuItem value='2'>2 - Fair</MenuItem>
                    <MenuItem value='3'>3 - Good</MenuItem>
                    <MenuItem value='4'>4 - Very good</MenuItem>
                    <MenuItem value='5'>5 - Excellent</MenuItem>
                  </Select>
                </FormControl>
               
                <FormControl fullWidth>
                <Typography variant='h6'>Title</Typography>
                <TextField
                  margin='normal'
                  fullWidth
                  autoComplete='title'
                  id='title'
                  label='Title'
                  type='title'
                  value={title}
                  name='title'
                  onChange={(e) => setTitle(e.target.value)}
                />
                </FormControl>
                <FormControl fullWidth>
                <Typography variant='h6'>Comment</Typography>
                <TextField
                  margin='normal'
                  fullWidth
                  autoComplete='comment'
                  id='comment'
                  label='Comment'
                  type='comment'
                  value={comment}
                  name='comment'
                  onChange={(e) => setComment(e.target.value)}
                />
                </FormControl>
                <Button type='submit' variant='contained' sx={{ mt: 2}}>
                  Submit Review
                </Button>
                </Box>
                ) : <Alert severity='info'>Please <Link to='/login'>login</Link> to post review</Alert>}
              </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default ProductDetails
