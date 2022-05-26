import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return userInfo ? children : <Navigate to='/'></Navigate>
}
export default PrivateRoute
