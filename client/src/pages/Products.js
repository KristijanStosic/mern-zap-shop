import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../actions/productActions'
import { Grid } from '@mui/material'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import Alert from '../components/Alert'

const Products = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)

  const { loading, error, products } = productList

  //const [loading, setLoading] = useState(true)
  //const [products, setProducts] = useState([])

  /*const getProducts = async () => {
    try {
      const { data } = await axios.get('/api/products')
      setProducts(data.products)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }*/

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <>
      <Meta title={'Products Page'} />

      {loading ? (
        <Loading message='Loading products...' />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <Grid container spacing={4}>
          {products &&
            products.map((product) => (
              <Grid item xs={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  )
}

export default Products
