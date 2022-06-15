import axios from 'axios'
import {
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_DETAILS_FAIL,
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_SUCCESS,
  ADDRESS_LIST_FAIL,
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_UPDATE_FAIL,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_SUCCESS,
} from '../constants/addressConstants'

export const getAllAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDRESS_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/addresses', config)

    dispatch({
      type: ADDRESS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADDRESS_LIST_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const getAddressDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDRESS_DETAILS_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/addresses/${id}`, config)

    dispatch({
      type: ADDRESS_DETAILS_SUCCESS,
      payload: data,
    })
    localStorage.setItem('addressInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ADDRESS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const createAddress = (address) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDRESS_CREATE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/addresses`, address, config)

    dispatch({ type: ADDRESS_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADDRESS_CREATE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const updateAddress = (address) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDRESS_UPDATE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(`/api/addresses/${address._id}`, address, config)

    dispatch({  type: ADDRESS_UPDATE_SUCCESS })
    dispatch({
      type: ADDRESS_DETAILS_SUCCESS,
      payload: data,
    })
    localStorage.setItem('addressInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ADDRESS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}
