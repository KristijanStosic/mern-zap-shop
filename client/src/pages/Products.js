import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllProducts } from '../redux/actions/productActions'
import { getAllCategories } from '../redux/actions/categoryActions'
import { getAllPublishers } from '../redux/actions/publisherActions'
import {
  Paper,
  Grid,
  Pagination,
  Box,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Typography,
} from '@mui/material'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import Alert from '../components/Alert'
import Search from '../components/Search'

const Products = () => {  
  const params = useParams()
  const dispatch = useDispatch()

  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [publisher, setPublisher] = useState('')
  const keyword = params.keyword

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, productsCount, productsPerPage } =
    productList

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const publisherList = useSelector((state) => state.publisherList)
  const { publishers } = publisherList

  useEffect(() => {
    dispatch(getAllProducts(keyword, page, sort, category, publisher))
    dispatch(getAllCategories())
    dispatch(getAllPublishers())
  }, [dispatch, keyword, page, sort, category, publisher])

  const handleChangeSort = (e) => {
    setSort(e.target.value)
  }

  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleChangePublisher = (e) => {
    setPublisher(e.target.value)
  }

  const resetApiFeatures = () => {
    setSort('')
    setCategory('')
    setPublisher('')
    setPage(1)
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {loading ? (
        <Loading message='Loading products...' />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <>
          <Meta title={'Products Page'} />
          <Search />
          <Grid sx={{ mt: 1 }} container spacing={3}>
            <Grid item xs={3}>
              <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 } }}>
              <Button variant='outlined' color='primary' onClick={resetApiFeatures}>All products</Button>
                <FormControl>
                  <RadioGroup onChange={handleChangeSort} value={sort}>
                    <FormControlLabel
                      value='name'
                      control={<Radio />}
                      label='Alphabetical'
                    />
                    <FormControlLabel
                      value='price'
                      control={<Radio />}
                      label='Price - Low to high'
                    />
                    <FormControlLabel
                      value='-price'
                      control={<Radio />}
                      label='Price - high to low'
                    />
                    <FormControlLabel
                      value='-createdAt'
                      control={<Radio />}
                      label='Newest'
                    />
                    <FormControlLabel
                      value='createdAt'
                      control={<Radio />}
                      label='Oldest'
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
              <Paper variant='outlined' sx={{ mt: 2, p: { xs: 2, md: 3 } }}>
                <Typography variant='h6'>Category</Typography>
                <FormControl>
                  <RadioGroup onChange={handleChangeCategory} value={category}>
                    {categories &&
                      categories.map((category) => (
                        <React.Fragment key={category._id}>
                        <FormControlLabel
                          value={category._id}
                          control={<Radio />}
                          label={category.name}
                        />
                        </React.Fragment>
                      ))}
                  </RadioGroup>
                </FormControl>
              </Paper>
              <Paper variant='outlined' sx={{ mt: 2, p: { xs: 2, md: 3 } }}>
                <Typography variant='h6'>Publisher</Typography>
                <FormControl>
                  <RadioGroup
                    onChange={handleChangePublisher}
                    value={publisher}
                  >
                    {publishers &&
                      publishers.map((publisher) => (
                        <React.Fragment key={publisher._id}>
                        <FormControlLabel
                          value={publisher._id}
                          control={<Radio />}
                          label={publisher.name}
                        />
                        </React.Fragment>
                      ))}
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            <Typography>Showing: <strong>{page}</strong> - <strong>{productsPerPage}</strong> of <strong>{productsCount}</strong> Results</Typography>
            {products &&
              products.map((product) => (
                <Grid item xs={3} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              mt: 3,
            }}
          >
            {productsPerPage <= productsCount &&
            <Pagination defaultPage={page} count={Math.ceil(productsCount / productsPerPage)} page={page} onChange={handleChange} showFirstButton showLastButton />}
          </Box>
        </>
      )}
    </>
  )
}

export default Products
