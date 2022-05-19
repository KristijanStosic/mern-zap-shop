import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Home,
  Register,
  Login,
  Verify,
  Dashboard,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword,
  Products,
  ProductDetails,
  About,
  NotFound,
  Cart,
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
  const [loading, setLoading] = useState(false)
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

              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<ProductDetails />} />
              <Route path='/cart'>
                <Route path=':id' element={<Cart />} />
                <Route index element={<Cart />} />
              </Route>

              <Route path='/about' element={<About />} />

              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/user/verify-email' element={<Verify />} />
              <Route path='/user/reset-password' element={<ResetPassword />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
