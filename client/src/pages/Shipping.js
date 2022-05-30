import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  Grid,
  TextField,
  Paper,
  Container,
  Button,
  Box,
  Divider,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { saveShippingAddress } from '../redux/actions/cartActions'
import Meta from '../components/Meta'
import CheckoutSteps from '../pages/CheckoutSteps'

const Shipping = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [firstName, setFirstName] = useState(shippingAddress.firstName)
  const [lastName, setLastName] = useState(shippingAddress.lastName)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
  const [country, setCountry] = useState(shippingAddress.country)

  const saveShippingAddressHandler = (e) => {
    //e.preventDefault()
    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        address,
        city,
        postalCode,
        phoneNumber,
        country,
      })
    )
    navigate('/payment-method')
  }

  return (
    <>
      <Meta title={'Shipping'} />
      <CheckoutSteps shipping />

      <Container component='main' maxWidth='sm' sx={{ mb: 2 }}>
        <Divider />

        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant='h6' gutterBottom>
            Shipping Address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='firstName'
                name='firstName'
                label='First name'
                type='text'
                fullWidth
                variant='standard'
                {...register('firstName', {
                  required: 'First name is required.',
                })}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='lastName'
                name='lastName'
                label='Last name'
                fullWidth
                variant='standard'
                type='text'
                {...register('lastName', {
                  required: 'Last name is required.',
                })}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='address'
                name='address'
                label='Address'
                fullWidth
                variant='standard'
                type='text'
                {...register('address', { required: 'Address is required.' })}
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='city'
                name='city'
                label='City'
                fullWidth
                variant='standard'
                type='text'
                {...register('city', { required: 'City is required.' })}
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='phoneNumber'
                name='phoneNumber'
                label='Phone Number'
                fullWidth
                variant='standard'
                type='text'
                {...register('phoneNumber', {
                  required: 'Phone number is required.',
                })}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='postalCode'
                name='postalCode'
                label='Zip / Postal code'
                fullWidth
                variant='standard'
                type='text'
                {...register('postalCode', {
                  required: 'Postal code is required.',
                })}
                error={Boolean(errors.postalCode)}
                helperText={errors.postalCode?.message}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='country'
                name='country'
                label='Country'
                fullWidth
                variant='standard'
                type='text'
                {...register('country', { required: 'Country is required.' })}
                error={Boolean(errors.country)}
                helperText={errors.country?.message}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box
            component='form'
            onSubmit={handleSubmit(saveShippingAddressHandler)}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button type='submit' variant='contained' sx={{ mt: 3, ml: 1 }}>
              Continue
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default Shipping
