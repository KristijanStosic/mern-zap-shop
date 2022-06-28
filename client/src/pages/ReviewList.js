import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { getAllReviews, deleteReview } from '../redux/actions/reviewActions'

const ReviewList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const reviewList = useSelector((state) => state.reviewList)
  const { loading, error, reviews } = reviewList

  const reviewDelete = useSelector((state) => state.reviewDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = reviewDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getAllReviews())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const deleteReviewHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview(id))
    }
  }

  return (
    <>
      <Meta title={'Admin Review List Page'} />
      {loadingDelete && <Loading message='Deleting review...' />}
      {errorDelete && <Alert severity='error'>{errorDelete}</Alert>}
      {loading ? (
        <Loading message='Loading reviews...' />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='h4'>REVIEWS</Typography>
              </Grid>
            </Grid>
            <TableContainer sx={{ mt: 2 }} component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align='center'>TITLE</TableCell>
                    <TableCell align='center'>COMMENT</TableCell>
                    <TableCell align='center'>RATING</TableCell>
                    <TableCell align='center'>USER</TableCell>
                    <TableCell align='center'>PRODUCT</TableCell>
                    <TableCell align='center'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review._id}>
                      <TableCell component='th' scope='row'>
                        {review._id}
                      </TableCell>
                      <TableCell align='center'>{review.title}</TableCell>
                      <TableCell align='center'>{review.comment}</TableCell>
                      <TableCell align='center'>{review.rating}</TableCell>
                      <TableCell align='center'>{review.user.name}</TableCell>
                      <TableCell align='center'>{review.product.name}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                        onClick={() => deleteReviewHandler(review._id)}>
                            <DeleteIcon style={{ color: 'red'}} />
                            </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ReviewList
