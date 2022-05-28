import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
  ReviewOrder,
  OrderSuccess,
  Order,
  Payment
} from './pages'

import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import Loading from './components/Loading'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  const [loading] = useState(false)
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

  if (loading) {
    return <Loading message='Initializing app...' />
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
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
              <Route path='/review-order' element={<ReviewOrder />} />
              <Route path='/order-success' element={<OrderSuccess />} />
              <Route path='/order/:id' element={ <ProtectedRoute> <Order /> </ProtectedRoute> } />
              <Route path='/payment' element={<Payment />} />

              {/* Admin */}
              <Route path='/admin-dashboard' element={ <ProtectedRoute> <AdminDashboard /> </ProtectedRoute> } />

              {/* Auth */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/user/verify-email' element={<Verify />} />
              <Route path='/user/reset-password' element={<ResetPassword />} />
              <Route path='*' element={<NotFound />} />

              {/* User */}
              <Route path='/profile' element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />
              <Route path='/update-password' element={<UpdatePassword />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
