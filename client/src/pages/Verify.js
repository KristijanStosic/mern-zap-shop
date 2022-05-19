import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Container, Button, Typography, Box } from '@mui/material'
import { verifyEmail, clearErrors } from '../actions/authActions'
import { useQuery } from '../utils/localState'
import axios from 'axios'
import Loading from '../components/Loading'


const VerifyPage = () => {
  const query = useQuery()

  const [token] = useState(query.get('token'))
  const [email] = useState(query.get('email'))

  console.log(token, email);
  const dispatch = useDispatch()

  const { error, loading, msg } = useSelector((state) => state.verifyEmail)

  const handleSubmit =  (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.set('token', token)
    formData.set('email', email)

    dispatch(verifyEmail(formData))
  }

  useEffect(() => {}, [])

  if (loading) {
    return (
      <Container>
        <Loading message='Loading...' />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Typography variant='h4'>
          There was an error, please double check your verification link
        </Typography>
      </Container>
    )
  }

  return (
    <Container>
      <Typography variant='h2'>Confirm Account</Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        {' '}
        <Button type='submit' color='primary' size='large' variant='contained'>
          Confirm Account By Clicking This Button
        </Button>
      </Box>
    </Container>
  )
}

export default VerifyPage
