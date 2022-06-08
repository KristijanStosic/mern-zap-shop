import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Typography,
  TextField,
  FormControl,
  Select,
  Button,
  Box,
  Paper,
  Container,
  MenuItem,
} from '@mui/material'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import styled from "styled-components";
import { toast } from 'react-toastify'
import { createProduct } from '../redux/actions/productActions'
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants'
import { getAllCategories } from '../redux/actions/categoryActions'
import { getAllPublishers } from '../redux/actions/publisherActions'

const ProductCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [publisher, setPublisher] = useState('')
  const [gameLength, setGameLength] = useState('')
  const [minPlayers, setMinPlayers] = useState(1)
  const [maxPlayers, setMaxPlayers] = useState(10)
  const [featured, setFeatured] = useState(false)
  const [freeShipping, setFreeShipping] = useState(false)
  const [sku, setSku] = useState('')
  const [suggestedAge, setSuggestedAge] = useState('')
  const [languageOfPublication, setLanguageOfPublication] = useState('')
  const [languageDependence, setLanguageDependence] = useState('')
  const [originCountry, setOriginCountry] = useState('')
  const [designer, setDesigner] = useState('')

  const productCreate = useSelector((state) => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product } = productCreate

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const publisherList = useSelector((state) => state.publisherList)
  const { publishers } = publisherList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getAllCategories())
      dispatch(getAllPublishers())
    } else {
      navigate('/login')
    }

    if (successCreate) {
      navigate('/admin/product-list')
    }
  }, [dispatch, userInfo, successCreate, product, navigate])

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0]

    if (!file) return toast.error('File not exist')

    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') return toast.error('File format is incorrect, please choose image')
    
    if (file.size > 1024 * 1024) return toast.error('Size to large')

    TransformFileData(file)
  }

  const TransformFileData = (file) => {
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImage(reader.result)
      }
    } else {
      setImage('')
    }
  }

  const createProductHandler = async (e) => {
    e.preventDefault()

    dispatch(
      createProduct({
        name,
        price,
        description,
        image,
        countInStock,
        gameLength,
        minPlayers,
        maxPlayers,
        featured,
        freeShipping,
        sku,
        suggestedAge,
        languageOfPublication,
        languageDependence,
        originCountry,
        designer,
        category,
        publisher
      })
    )
  }

  return (
    <>
      <Meta title={'Admin Create Product Page'} />
      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Button variant='contained' component={Link} to={`/admin/product-list`}>
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
                CREATE PRODUCT
              </Typography>
              {loadingCreate && <Loading message='Creating product...' />}
              {errorCreate && <Alert severity='error'>{errorCreate}</Alert>}
              <Box
                component='form'
                encType='multipart/form-data'
                onSubmit={createProductHandler}
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
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='description'
                  id='description'
                  label='Description'
                  name='description'
                  type='text'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='price'
                  id='price'
                  label='Price'
                  name='price'
                  type='number'
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='countInStock'
                  id='countInStock'
                  label='Count in stock'
                  name='countInStock'
                  type='number'
                  onChange={(e) => setCountInStock(e.target.value)}
                  value={countInStock}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='gameLength'
                  id='gameLength'
                  label='Game length'
                  name='gameLength'
                  type='text'
                  onChange={(e) => setGameLength(e.target.value)}
                  value={gameLength}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='minPlayers'
                  id='minPlayers'
                  label='Minimum number of players'
                  name='minPlayers'
                  type='number'
                  onChange={(e) => setMinPlayers(e.target.value)}
                  value={minPlayers}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='maxPlayers'
                  id='maxPlayers'
                  label='Maximum number of players'
                  name='maxPlayers'
                  type='number'
                  onChange={(e) => setMaxPlayers(e.target.value)}
                  value={maxPlayers}
                />
                <FormControl fullWidth>
                  <small>Select is Product featured</small>
                  <Select
                    sx={{ mt: 1 }}
                    id='featured'
                    size='small'
                    onChange={(e) => setFeatured(e.target.value)}
                    value={featured}
                  >
                    <MenuItem value='true'>Yes</MenuItem>
                    <MenuItem value='false'>No</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <small>Select is Product has free shipping</small>
                  <Select
                    sx={{ mt: 1 }}
                    id='freeShipping'
                    size='small'
                    onChange={(e) => setFreeShipping(e.target.value)}
                    value={freeShipping}
                  >
                    <MenuItem value='true'>Yes</MenuItem>
                    <MenuItem value='false'>No</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='sku'
                  id='sku'
                  label='SKU'
                  name='sku'
                  type='text'
                  onChange={(e) => setSku(e.target.value)}
                  value={sku}
                />
                <FormControl fullWidth>
                  <small>Select Category</small>
                  <Select
                    sx={{ mt: 1 }}
                    id='category'
                    size='small'
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 1 }}>
                  <small>Select Publisher</small>
                  <Select
                    sx={{ mt: 1 }}
                    id='publisher'
                    size='small'
                    onChange={(e) => setPublisher(e.target.value)}
                    value={publisher}
                  >
                    {publishers &&
                      publishers.map((publisher) => (
                        <MenuItem key={publisher._id} value={publisher._id}>
                          {publisher.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='suggestedAge'
                  id='suggestedAge'
                  label='Suggested Age'
                  name='suggestedAge'
                  type='text'
                  onChange={(e) => setSuggestedAge(e.target.value)}
                  value={suggestedAge}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='languageOfPublication'
                  id='languageOfPublication'
                  label='Language of publication'
                  name='languageOfPublication'
                  type='text'
                  onChange={(e) => setLanguageOfPublication(e.target.value)}
                  value={languageOfPublication}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='languageDependence'
                  id='languageDependence'
                  label='Language dependence'
                  name='languageDependence'
                  type='text'
                  onChange={(e) => setLanguageDependence(e.target.value)}
                  value={languageDependence}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='originCountry'
                  id='originCountry'
                  label='Origin country'
                  name='originCountry'
                  type='text'
                  onChange={(e) => setOriginCountry(e.target.value)}
                  value={originCountry}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='designer'
                  id='designer'
                  label='Designer'
                  name='designer'
                  type='text'
                  onChange={(e) => setDesigner(e.target.value)}
                  value={designer}
                />
                <label htmlFor='contained-button-file'>
                  <p>Please choose product image</p>
                  <input
                    id='imgUpload'
                    accept='image/*'
                    type='file'
                    onChange={handleProductImageUpload}
                    required
                  />
                </label>
                <ImagePreview>
                  {image ? (
                    <>
                      <img src={image} alt='error!' />
                    </>
                  ) : (
                    <p>Product image upload preview will appear here!</p>
                  )}
                </ImagePreview>
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

const ImagePreview = styled.div`
  margin-top: 15px;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`

export default ProductCreate
