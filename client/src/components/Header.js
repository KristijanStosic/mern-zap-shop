import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  Menu,
  Avatar,
  Divider,
} from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import 'react-toastify/dist/ReactToastify.css'
import { ShoppingCart, Logout } from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import { logout } from '../redux/actions/authActions'

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
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
    toast.info('Logout successfully!')
    navigate('/login')
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }


  return (
    <>
      <AppBar position='static' sx={{ mb: 4, backgroundColor: 'dark' }}>
        <ToastContainer
          position='bottom-center'
          theme='colored'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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

          <Box display='flex' alignItems='center'>
            <IconButton
              component={Link}
              to='/cart'
              size='small'
              disableRipple
              style={{ backgroundColor: 'transparent' }}
              sx={{ color: 'white', alignItems: 'center' }}
              
            >
              <Badge
                badgeContent={cartItems.length}
                color='secondary'
                sx={{ marginRight: 2 }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
            {userInfo ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                    <IconButton
                      disableRipple
                      onClick={handleClick} 
                      style={{ backgroundColor: 'transparent', color: 'white' }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <ListItemText size='small' sx={{ ml: 2 }}>
                      {userInfo.user.name}
                      </ListItemText>
                      <ArrowDropDownIcon />
                    </IconButton>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id='account-menu'
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem component={Link} to='/profile'>
                    <Avatar /> Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to='/my-address'>
                    Address
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={logoutHandler}>
                    <ListItemIcon>
                      <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
                {userInfo && userInfo.user.role === 'admin' && (
                  <Menu
                  anchorEl={anchorEl}
                  id='account-menu'
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem component={Link} to='/profile'>
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to='/admin/user-list'>
                    Users
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to='/admin/product-list'>
                    Products
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to='/admin/order-list'>
                    Orders
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to='/admin/category-list'>
                    Categories
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to='/admin/publisher-list'>
                    Publishers
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to='/admin/address-list'>
                    Addresses
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to='/admin/review-list'>
                    Reviews
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={logoutHandler}>
                    <ListItemIcon>
                      <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
                )}
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
    </>
  )
}

export default Header
