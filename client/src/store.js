import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productListAdminReducer,
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
  userUpdateReducer,
} from './redux/reducers/userReducers'

import {
  orderCreateReducer,
  orderDetailsReducer,
  myOrdersReducer,
  orderListReducer,
  orderDeliverReducer,
  orderPayReducer,
} from './redux/reducers/orderReducers'

import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from './redux/reducers/categoryReducers'

import {
  publisherCreateReducer,
  publisherDeleteReducer,
  publisherDetailsReducer,
  publisherListReducer,
  publisherUpdateReducer,
} from './redux/reducers/publisherReducers'

import {
  reviewCreateReducer,
  reviewDeleteReducer,
  reviewListReducer,
  singleProductReviewsReducer,
} from './redux/reducers/reviewReducers'

import {
  addressCreateReducer,
  addressDetailsReducer,
  addressListReducer,
  addressUpdateReducer,
} from './redux/reducers/addressReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productListAdmin: productListAdminReducer,
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
  orderDeliver: orderDeliverReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  publisherList: publisherListReducer,
  publisherDetails: publisherDetailsReducer,
  publisherCreate: publisherCreateReducer,
  publisherUpdate: publisherUpdateReducer,
  publisherDelete: publisherDeleteReducer,
  addressList: addressListReducer,
  addressDetails: addressDetailsReducer,
  addressCreate: addressCreateReducer,
  addressUpdate: addressUpdateReducer,
  reviewCreate: reviewCreateReducer,
  singleProductReviews: singleProductReviewsReducer,
  reviewList: reviewListReducer,
  reviewDelete: reviewDeleteReducer
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

const addressInfoFromStorage = localStorage.getItem('addressInfo')
  ? JSON.parse(localStorage.getItem('addressInfo'))
  : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  userAddress: { addressInfo: addressInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
