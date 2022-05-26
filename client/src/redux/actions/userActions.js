import axios from 'axios'
import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants'

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(`/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const updateUserPassword = (password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PASSWORD_REQUEST })

    const {
        userLogin: { userInfo },
      } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(`api/users/updateUserPassword`, password, config)

    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: data.msg,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}
