import {
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_LIST_FAIL,
  ADDRESS_LIST_RESET,
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_SUCCESS,
  ADDRESS_DETAILS_FAIL,
  ADDRESS_DETAILS_RESET,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_RESET,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_UPDATE_FAIL,
  ADDRESS_UPDATE_RESET,
} from '../constants/addressConstants'

export const addressListReducer = (state = { addresses: [] }, action) => {
  switch (action.type) {
    case ADDRESS_LIST_REQUEST:
      return { ...state, loading: true }
    case ADDRESS_LIST_SUCCESS:
      return { loading: false, addresses: action.payload }
    case ADDRESS_LIST_FAIL:
      return { loading: false, error: action.payload }
    case ADDRESS_LIST_RESET:
      return { addresses: [] }
    default:
      return state
  }
}

export const addressDetailsReducer = (state = { loading: true, address: {} }, action) => {
  switch (action.type) {
    case ADDRESS_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ADDRESS_DETAILS_SUCCESS:
      return { ...state, loading: false, address: action.payload }
    case ADDRESS_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ADDRESS_DETAILS_RESET:
      return { address: {} }
    default:
      return state
  }
}

export const addressCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_CREATE_REQUEST:
      return { loading: true, }
    case ADDRESS_CREATE_SUCCESS:
      return { loading: false, success: true, address: action.payload }
    case ADDRESS_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ADDRESS_CREATE_RESET:
      return { }
    default:
      return state 
  }
}

export const addressUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_UPDATE_REQUEST:
      return { loading: true }
    case ADDRESS_UPDATE_SUCCESS:
      return { loading: false, success: true, address: action.payload }
    case ADDRESS_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ADDRESS_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
