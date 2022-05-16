import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { Container, Button, Typography } from '@mui/material'
import axios from 'axios'
import styled from 'styled-components'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const VerifyPage = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isLoading } = useGlobalContext()
  const query = useQuery()

  const verifyToken = async () => {
    setLoading(true)
    try {
      await axios.post('/api/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      })
    } catch (error) {
      // console.log(error.response);
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!isLoading) {
      verifyToken()
    }
  }, [isLoading])

  if (loading) {
    return (
      <Wrapper className='page'>
        <h2>Loading...</h2>
      </Wrapper>
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
    <Container className='page'>
      <Typography variant='h2'>Account Confirmed</Typography>
      <Button color='primary' size='large' variant='contained'>
        <Link to='/login' style={{ color: 'white' }}>
          LOGIN
        </Link>
      </Button>
    </Container>
  )
}

const Wrapper = styled.section``

export default VerifyPage
