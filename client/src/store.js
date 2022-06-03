import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
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
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './redux/reducers/userReducers'

import {
  orderCreateReducer,
  orderDetailsReducer,
  myOrdersReducer,
  orderListReducer,
} from './redux/reducers/orderReducers'
import { categoryCreateReducer, categoryDeleteReducer, categoryListReducer } from './redux/reducers/categoryReducers'
import { publisherDeleteReducer, publisherListReducer } from './redux/reducers/publisherReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  verifyEmail: verifyEmailReducer,
  userDetails: userDetailsReducer,
  userUpdatePassword: updatePasswordReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  myOrders: myOrdersReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  publisherList: publisherListReducer,
  publisherDelete: publisherDeleteReducer
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
