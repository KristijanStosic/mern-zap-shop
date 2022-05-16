import React from 'react'
import { useGlobalContext } from '../context'
import { Link, NavLink } from 'react-router-dom'
import {
  AppBar,
  Badge,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
  Box,
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'

const middleLinks = [
  { title: 'home', path: '/' },
  { title: 'products', path: '/products' },
  { title: 'orders', path: '/orders' },
  { title: 'about', path: '/about' },
  { title: 'admin', path: '/admin' },

]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
]

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500',
  },
  '&.active': {
    color: 'text.secondary',
  },
}

const Header = ({ darkMode, handleThemeChange }) => {
  const { user, logoutUser } = useGlobalContext()

  return (
    <AppBar position='static' sx={{ mb: 4, backgroundColor: 'dark' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' component={NavLink} to='/' sx={navStyles}>
            ZAP-SHOP
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <List sx={{ display: 'flex' }}>
          {middleLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <Badge badgeContent={2} color='secondary'>
            <ShoppingCart />
          </Badge>
          <IconButton
            component={Link}
            to='/cart'
            size='large'
            sx={{ color: 'inherit' }}
          ></IconButton>
          {user ? (
            <>
              <ListItem>Hello, {user.name}</ListItem>
              <List sx={navStyles}>
                <ListItem onClick={() => {
                logoutUser()
              }}>LOGOUT</ListItem>
              </List>
            </>
          ) : (
            <List sx={{ display: 'flex' }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
