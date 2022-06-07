import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, } from 'react-router-dom'
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
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants'
import { getAllProducts, deleteProduct } from '../redux/actions/productActions'

const ProductList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productCreate = useSelector((state) => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (userInfo.user.role !== 'admin') {
      navigate('/login')
    }

    if(successCreate) {
      navigate(`/admin/product/${createdProduct.id}/update`)
    } else {
      dispatch(getAllProducts())
    }
  }, [dispatch, navigate, userInfo, successCreate, successDelete, createdProduct])

  const deleteProductHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  /*const createProductHandler = () => {
    dispatch(createProduct())
  }*/

  return (
    <>
      <Meta title={'Admin Product List Page'} />
      {loadingCreate && <Loading message='Creating product...' />}
      {errorCreate && <Alert severity='error'>{errorCreate}</Alert>}
      {loadingDelete && <Loading message='Deleting product...' />}
      {errorDelete && <Alert severity='error'>{errorDelete}</Alert>}
      {loading ? (
        <Loading message='Loading products...' />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='h4'>PRODUCTS</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button component={Link} to='/admin/product-create' variant='contained' color='primary' startIcon={<AddBoxIcon />}>
                  CREATE PRODUCT
                </Button>
              </Grid>
            </Grid>
            <TableContainer sx={{ mt: 2 }} component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align='center'>NAME</TableCell>
                    <TableCell align='center'>PRICE</TableCell>
                    <TableCell align='center'>STOCK</TableCell>
                    <TableCell align='center'>DESIGNER</TableCell>
                    <TableCell align='center'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell component='th' scope='row'>
                        {product._id}
                      </TableCell>
                      <TableCell align='center'>{product.name}</TableCell>
                      <TableCell align='center'>${product.price}</TableCell>
                      <TableCell align='center'>{product.countInStock}</TableCell>
                      <TableCell align='center'>{product.designer}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                        component={Link} 
                        to={`/admin/product/${product._id}/update`}>
                            <EditIcon style={{ color: 'teal'}} />
                        </IconButton> 
                        <IconButton 
                        onClick={() => deleteProductHandler(product._id)}>
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

export default ProductList
