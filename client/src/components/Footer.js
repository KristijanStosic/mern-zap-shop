import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, Box } from '@mui/material'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © 2022'}
      <Link color="inherit" to="https://google.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}

    </Typography>
  );
}

const Footer = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
