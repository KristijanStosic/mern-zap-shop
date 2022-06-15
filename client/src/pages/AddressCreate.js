import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
import { createAddress } from '../redux/actions/addressActions'
import { ADDRESS_CREATE_RESET } from '../redux/constants/addressConstants'
import { ADDRESS_DETAILS_RESET } from '../redux/constants/addressConstants'

const AddressCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const addressCreate = useSelector((state) => state.addressCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, address } = addressCreate

  const addressDetails = useSelector((state) => state.addressDetails)
  const { address: loadedAddress } = addressDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: ADDRESS_CREATE_RESET })
    dispatch({ type: ADDRESS_DETAILS_RESET })

    if(successCreate || loadedAddress) {
      navigate('/my-address')
    }
  }, [dispatch, userInfo, successCreate, address, navigate])

  const createAddressHandler = (e) => {
    e.preventDefault()
    dispatch(createAddress({ street, city, postalCode, country }))
  }

  return (
    <>
      <Meta title={'Create Address Page'} />
      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
            <>
              <Typography component='h1' variant='h5'>
               CREATE ADDRESS
              </Typography>
              {errorCreate && <Alert severity='error'>{errorCreate}</Alert>}
              {loadingCreate && <Loading message='Creating address...' />}
              <Box
                component='form'
                onSubmit={createAddressHandler}
                noValidate
                sx={{ mt: 2 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='street'
                  id='street'
                  label='Street'
                  type='street'
                  name='street'
                  onChange={(e) => setStreet(e.target.value)}
                  value={street}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='city'
                  id='city'
                  label='City'
                  type='city'
                  name='city'
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='postalCode'
                  id='postalCode'
                  label='Postal Code'
                  type='postalCode'
                  name='postalCode'
                  onChange={(e) => setPostalCode(e.target.value)}
                  value={postalCode}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  autoComplete='country'
                  id='country'
                  label='Country'
                  type='country'
                  name='country'
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
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
        </Paper>
      </Container>
    </>
  )
}


export default AddressCreate
