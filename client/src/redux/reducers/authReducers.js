import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
  RESET_PASSWORD_RESET,
} from '../constants/authConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: true, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null }
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true }
    case FORGOT_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload }
    case FORGOT_PASSWORD_RESET:
      return { }
    default:
      return state
  }
}

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null }
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true }
    case RESET_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload }
    case RESET_PASSWORD_RESET:
      return { }
    default:
      return state
  }
}

export const verifyEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
      return { ...state, loading: true, error: null }
    case VERIFY_EMAIL_SUCCESS:
      return { ...state, loading: false, msg: action.payload }
    case VERIFY_EMAIL_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
