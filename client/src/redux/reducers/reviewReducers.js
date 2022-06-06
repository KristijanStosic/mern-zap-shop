import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_RESET,
  SINGLE_PRODUCT_REVIEW_REQUEST,
  SINGLE_PRODUCT_REVIEW_SUCCESS,
  SINGLE_PRODUCT_REVIEW_FAIL,
} from '../constants/reviewConstants'

export const reviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true }
    case REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true }
    case REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case REVIEW_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const singleProductReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REVIEW_REQUEST:
      return {  ...state, loading: true, }
    case SINGLE_PRODUCT_REVIEW_SUCCESS:
      return { loading: false, reviews: action.payload }
    case SINGLE_PRODUCT_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state 
  }
}

