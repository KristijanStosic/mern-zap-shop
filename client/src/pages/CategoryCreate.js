import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
import { createCategory } from '../redux/actions/categoryActions'
import { CATEGORY_CREATE_RESET } from '../redux/constants/categoryConstants'

const CategoryCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, category } = categoryCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET })
    if(userInfo.user.role !== 'admin') {
        navigate('/login')
    }

    if(successCreate) {
      navigate('/admin/category-list')
    } 
    
  }, [dispatch, userInfo, successCreate, category, navigate])

  const createCategoryHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set('name', name)

    dispatch(createCategory({ name }))
  }

  return (
    <>
      <Meta title={'Admin Create Category Page'} />
      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Button variant='contained' component={Link} to={`/admin/category-list`}>
          Go Back
        </Button>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
        {loadingCreate && <Loading message='Loading...' />}
          {loadingCreate ? (
            <Loading message='Loading...' />
          ) : errorCreate ? (
            <Alert severity='error'>{errorCreate}</Alert>
          ) : (
            <>
              <Typography component='h1' variant='h5'>
               CREATE CATEGORY
              </Typography>
              {loadingCreate && <Loading message='Creating category...' />}
              {errorCreate && <Alert severity='error'>{errorCreate}</Alert>}
              <Box
                component='form'
                onSubmit={createCategoryHandler}
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
                  CREATE
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  )
}


export default CategoryCreate
