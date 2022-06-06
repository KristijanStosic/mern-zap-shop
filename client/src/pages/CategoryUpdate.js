import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Container,
} from '@mui/material'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { toast } from 'react-toastify'
import { CATEGORY_UPDATE_RESET } from '../redux/constants/categoryConstants'
import { getCategoryDetails, updateCategory } from '../redux/actions/categoryActions'

const CategoryUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const [name, setName] = useState('')

  const categoryId = params.id

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading: loadingCategory, error, category } = categoryDetails

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate

  useEffect(() => {
    // if successUpdate reset user state and redirect to user list
    if(successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET })
      navigate('/admin/category-list')
    } else {
      if (!category || category._id !== categoryId) {
        dispatch(getCategoryDetails(categoryId))
      } else {
        setName(category.name)
      }
    }
    
  }, [dispatch, categoryId, category, successUpdate, navigate])

  const updateCategoryHandler = (e) => {
    e.preventDefault()
    dispatch(updateCategory({ _id: categoryId, name }))
    toast.info('Category updated successfully')
  }

  return (
    <>
      <Meta title={'Update Category Page'} />
      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Button variant='contained' component={Link} to={`/admin/category-list`}>
          Go Back
        </Button>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {loadingCategory ? (
            <Loading message='Loading...' />
          ) : error ? (
            <Alert severity='error'>{error}</Alert>
          ) : (
            <>
              <Typography component='h1' variant='h5'>
                UPDATE CATEGORY
              </Typography>
              {loadingUpdate && <Loading message='' />}
              {errorUpdate && <Alert severity='error'>{errorUpdate}</Alert>}
              <Box
                component='form'
                onSubmit={updateCategoryHandler}
                noValidate
                sx={{ mt: 2 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='name'
                  autoFocus
                  id='name'
                  label='Name'
                  type='name'
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  UPDATE
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  )
}

export default CategoryUpdate
