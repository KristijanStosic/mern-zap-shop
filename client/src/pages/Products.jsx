import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../context'
import ProductList from '../components/ProductList'
import Loading from './Loading'
import Meta from '../components/Meta'

const Products = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/api/products')
      setProducts(data.products)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) return <Loading message='Loading products...' />

  return (
    <>
      <Meta title={'Products Page'} />
      <ProductList products={products} />
    </>
  )
}

export default Products
