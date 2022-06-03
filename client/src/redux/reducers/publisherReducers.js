import {
  PUBLISHER_LIST_REQUEST,
  PUBLISHER_LIST_SUCCESS,
  PUBLISHER_LIST_FAIL,
  PUBLISHER_LIST_RESET,
  PUBLISHER_DELETE_REQUEST,
  PUBLISHER_DELETE_SUCCESS,
  PUBLISHER_DELETE_FAIL,
} from '../constants/publisherConstants'

export const publisherListReducer = (state = { publishers: [] }, action) => {
  switch (action.type) {
    case PUBLISHER_LIST_REQUEST:
      return { loading: true }
    case PUBLISHER_LIST_SUCCESS:
      return { loading: false, publishers: action.payload.publishers }
    case PUBLISHER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case PUBLISHER_LIST_RESET:
      return { publishers: [] }
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
