import axios from 'axios'
import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  SINGLE_PRODUCT_REVIEW_REQUEST,
  SINGLE_PRODUCT_REVIEW_SUCCESS,
  SINGLE_PRODUCT_REVIEW_FAIL,
} from '../constants/reviewConstants'

export const createReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_CREATE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/reviews`, review, config)

    dispatch({ type: REVIEW_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const getSingleProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REVIEW_REQUEST })

    const { data } = await axios.get(`/api/products/${id}/reviews`)

    dispatch({
      type: SINGLE_PRODUCT_REVIEW_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}