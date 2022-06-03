import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
  Button,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { getAllCategories, deleteCategory } from '../redux/actions/categoryActions'

const CategoryList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = categoryList

  const categoryDelete = useSelector((state) => state.categoryDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getAllCategories())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const deleteCategoryHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id))
    }
  }

  return (
    <>
      <Meta title={'Admin Category List Page'} />
      {loadingDelete && <Loading message='Deleting category...' />}
      {errorDelete && <Alert severity='error'>{errorDelete}</Alert>}
      {loading ? (
        <Loading message='Loading categories...' />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='h4'>CATEGORIES</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button component={Link} to='/admin/category-create' variant='contained' color='primary' startIcon={<AddBoxIcon />}>
                  CREATE CATEGORY
                </Button>
              </Grid>
            </Grid>
            <TableContainer sx={{ mt: 2 }} component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align='center'>NAME</TableCell>
                    <TableCell align='center'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell component='th' scope='row'>
                        {category._id}
                      </TableCell>
                      <TableCell align='center'>{category.name}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                        component={Link} 
                        to={`/admin/category/${category._id}/update`}>
                            <EditIcon style={{ color: 'teal'}} />
                        </IconButton> 
                        <IconButton 
                        onClick={() => deleteCategoryHandler(category._id)}>
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

export default CategoryList
