import {
  PUBLISHER_LIST_REQUEST,
  PUBLISHER_LIST_SUCCESS,
  PUBLISHER_LIST_FAIL,
  PUBLISHER_LIST_RESET,
  PUBLISHER_DELETE_REQUEST,
  PUBLISHER_DELETE_SUCCESS,
  PUBLISHER_DELETE_FAIL,
  PUBLISHER_CREATE_REQUEST,
  PUBLISHER_CREATE_SUCCESS,
  PUBLISHER_UPDATE_REQUEST,
  PUBLISHER_UPDATE_SUCCESS,
  PUBLISHER_UPDATE_FAIL,
  PUBLISHER_UPDATE_RESET,
  PUBLISHER_DETAILS_REQUEST,
  PUBLISHER_DETAILS_SUCCESS,
  PUBLISHER_DETAILS_FAIL,
  PUBLISHER_DETAILS_RESET,
  PUBLISHER_CREATE_FAIL,
  PUBLISHER_CREATE_RESET,
} from '../constants/publisherConstants'

export const publisherListReducer = (state = { publishers: [] }, action) => {
  switch (action.type) {
    case PUBLISHER_LIST_REQUEST:
      return { loading: true }
    case PUBLISHER_LIST_SUCCESS:
      return { loading: false, publishers: action.payload }
    case PUBLISHER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case PUBLISHER_LIST_RESET:
      return { publishers: [] }
    default:
      return state
  }
}

export const publisherDetailsReducer = (state = { loading: true, publisher: {} }, action) => {
  switch (action.type) {
    case PUBLISHER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PUBLISHER_DETAILS_SUCCESS:
      return { ...state, loading: false, publisher: action.payload }
    case PUBLISHER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PUBLISHER_DETAILS_RESET:
      return { publisher: {} }
    default:
      return state
  }
}

export const publisherCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PUBLISHER_CREATE_REQUEST:
      return { loading: true, }
    case PUBLISHER_CREATE_SUCCESS:
      return { loading: false, success: true, publisher: action.payload }
    case PUBLISHER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PUBLISHER_CREATE_RESET:
      return { }
    default:
      return state 
  }
}

export const publisherUpdateReducer = (state = { publisher: {} }, action) => {
  switch (action.type) {
    case PUBLISHER_UPDATE_REQUEST:
      return { loading: true }
    case PUBLISHER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case PUBLISHER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PUBLISHER_UPDATE_RESET:
      return { publisher: {} }
    default:
      return state
  }
}

export const publisherDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PUBLISHER_DELETE_REQUEST:
      return { loading: true }
    case PUBLISHER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PUBLISHER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
