import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/actions/productActions'
import { Grid } from '@mui/material'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import Alert from '../components/Alert'

const Products = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loading message='Loading products...' />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <>
          <Meta title={'Products Page'} />
          <Grid container spacing={4}>
            {products &&
              products.map((product) => (
                <Grid item xs={3} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </>
  )
}

export default Products
