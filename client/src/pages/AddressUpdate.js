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
import { ADDRESS_UPDATE_RESET } from '../redux/constants/addressConstants'
import { getAddressDetails, updateAddress } from '../redux/actions/addressActions'

const AddressUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const addressId = params.id

  const addressDetails = useSelector((state) => state.addressDetails)
  const { loading: loadingAddress, error, address } = addressDetails

  const addressUpdate = useSelector((state) => state.addressUpdate)
  const { success: successUpdate, loading: loadingUpdate, error: errorAddressUpdate } = addressUpdate

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: ADDRESS_UPDATE_RESET })
      navigate('/my-address')
    } else {
      if (!address || address._id !== addressId) {
        dispatch(getAddressDetails(addressId))
      } else {
        setStreet(address.street)
        setCity(address.city)
        setPostalCode(address.postalCode)
        setCountry(address.country)
      }
    }
    
  }, [dispatch, addressId, address, successUpdate, navigate])

  const updateAddressHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateAddress({
        _id: addressId,
        street,
        city,
        postalCode,
        country,
      })
    )
  }

  return (
    <>
      <Meta title={'Update Address Page'} />
      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Button variant='contained' component={Link} to={`/my-address`}>
          Go Back
        </Button>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {loadingAddress ? (
            <Loading message='Loading address...' />
          ) : error ? (
            <Alert severity='error'>{error}</Alert>
          ) : (
            <>
              <Typography component='h1' variant='h5'>
                UPDATE ADDRESS
              </Typography>
              {loadingUpdate && <Loading message='Updating address...' />}
              {errorAddressUpdate && <Alert severity='error'>{errorAddressUpdate}</Alert>}
              <Box
                component='form'
                onSubmit={updateAddressHandler}
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
                  label='country'
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

export default AddressUpdate
