import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, Box } from '@mui/material'

const Copyright = () => {
  return (
    <Typography variant="body2" color="white">
      {'Copyright ©'}
      <Link style={{ color: 'white', fontWeight: 500 }} to='/'>
        ZAP-SHOP
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
        bgcolor="primary.main"   
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          width: 1,
        }}
      >
        <Container sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}} maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
