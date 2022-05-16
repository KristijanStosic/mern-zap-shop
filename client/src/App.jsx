import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  Home,
  NotFound,
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
} from './pages'

import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import Loading from './pages/Loading'
import Header from './components/Header'
import Footer from './components/Footer'

import { useGlobalContext } from './context'

const App = () => {
  const [loading, setLoading] = useState(true)
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

  const { isLoading } = useGlobalContext()
  if (isLoading) {
    return <Loading message='Initializing...' />
  }
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/user/verify-email' element={<Verify />} />
            <Route path='/user/reset-password' element={<ResetPassword />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
