import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const useLocalState = () => {
  const [hide, setHide] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    text: '',
    type: 'error',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const showAlert = ({ text, type = 'error' }) => {
    setAlert({ show: true, text, type })
  }
  const hideAlert = () => {
    setAlert({ show: false, text: '', type: 'error' })
  }

  const showPassword = (e) => {
    e.preventDefault()
    setHide(!hide)
  }

  return {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
    showPassword,
    hide,
  }
}

export default useLocalState
