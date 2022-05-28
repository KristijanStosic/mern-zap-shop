import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './redux/reducers/productReducers'
import { cartReducer } from './redux/reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  verifyEmailReducer,
} from './redux/reducers/authReducers'

import {
  userDetailsReducer,
  updatePasswordReducer,
  userUpdateProfileReducer,
} from './redux/reducers/userReducers'

import {
  orderCreateReducer,
  orderDetailsReducer,
  myOrdersReducer
} from './redux/reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  verifyEmail: verifyEmailReducer,
  userDetails: userDetailsReducer,
  userUpdatePassword: updatePasswordReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  myOrders: myOrdersReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store