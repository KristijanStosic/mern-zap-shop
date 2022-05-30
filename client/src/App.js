import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import {
  Home,
  Register,
  Login,
  Verify,
  AdminDashboard,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword,
  Products,
  ProductDetails,
  About,
  NotFound,
  Cart,
  Profile,
  UpdatePassword,
  Shipping,
  PaymentMethod,
  PlaceOrder,
  OrderSuccess,
  Order,
  Payment,
  CheckoutSuccess,
  UserList,
  UserUpdate
} from './pages'

import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212',
      },
    },
  })

  const handleThemeChange = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <React.Fragment>
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Container>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />

                {/* Products */}
                <Route path='/products' element={<Products />} />
                <Route path='/products/:id' element={<ProductDetails />} />

                {/* Cart */}
                <Route path='/cart'>
                  <Route path=':id' element={<Cart />} />
                  <Route index element={<Cart />} />
                </Route>

                {/* Checkout and Orders */}
                <Route path='/shipping' element={<Shipping />} />
                <Route path='/payment-method' element={<PaymentMethod />} />
                <Route path='/place-order' element={<PlaceOrder />} />
                <Route path='/order-success' element={<OrderSuccess />} />
                <Route
                  path='/order/:id'
                  element={
                    <ProtectedRoute>
                      {' '}
                      <Order />{' '}
                    </ProtectedRoute>
                  }
                />

                  <Route
                  path='/payment'
                  element={
                    <ProtectedRoute>
                      {' '}
                      <Payment />{' '}
                    </ProtectedRoute>
                  }
                />

                <Route path='/checkout-success' element={<CheckoutSuccess />} />

                {/* Admin */}
                <Route path='/admin-dashboard' element={ <ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />

                {/* Auth */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/user/verify-email' element={<Verify />} />
                <Route
                  path='/user/reset-password'
                  element={<ResetPassword />}
                />
                <Route path='*' element={<NotFound />} />

                {/* User */}
                <Route path='/profile' element={ <ProtectedRoute> <Profile /> </ProtectedRoute>} />
                <Route path='/admin/user-list' element={ <ProtectedRoute> <UserList /> </ProtectedRoute>} />
                <Route path='/admin/user/:id/update' element={ <ProtectedRoute> <UserUpdate /> </ProtectedRoute>} />
                <Route path='/update-password' element={ <ProtectedRoute> <UpdatePassword /> </ProtectedRoute>} />
              </Routes>
            </Container>
            <Footer />
          </React.Fragment>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
