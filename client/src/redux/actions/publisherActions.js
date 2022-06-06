import axios from 'axios'
import {
  PUBLISHER_LIST_REQUEST,
  PUBLISHER_LIST_SUCCESS,
  PUBLISHER_LIST_FAIL,
  PUBLISHER_DELETE_SUCCESS,
  PUBLISHER_DELETE_FAIL,
  PUBLISHER_DELETE_REQUEST,
  PUBLISHER_CREATE_REQUEST,
  PUBLISHER_CREATE_SUCCESS,
  PUBLISHER_CREATE_FAIL,
  PUBLISHER_DETAILS_REQUEST,
  PUBLISHER_DETAILS_SUCCESS,
  PUBLISHER_DETAILS_FAIL,
  PUBLISHER_UPDATE_REQUEST,
  PUBLISHER_UPDATE_SUCCESS,
  PUBLISHER_UPDATE_FAIL,
} from '../constants/publisherConstants'

export const getAllPublishers = () => async (dispatch) => {
  try {
    dispatch({ type: PUBLISHER_LIST_REQUEST })

    const { data } = await axios.get('/api/publishers')

    dispatch({
      type: PUBLISHER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PUBLISHER_LIST_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const getPublisherDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PUBLISHER_DETAILS_REQUEST })

    const { userLogin: { userInfo }, } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/publishers/${id}`, config)

    dispatch({
      type: PUBLISHER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PUBLISHER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const createPublisher = (publisher) => async (dispatch, getState) => {
  try {
    dispatch({ type: PUBLISHER_CREATE_REQUEST })

    const { userLogin: { userInfo }, } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/publishers`, publisher, config)

    dispatch({ type: PUBLISHER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PUBLISHER_CREATE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const updatePublisher = (publisher) => async (dispatch, getState) => {
  try {
    dispatch({ type: PUBLISHER_UPDATE_REQUEST })

    const { userLogin: { userInfo }, } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(`/api/publishers/${publisher._id}`, publisher, config)

    dispatch({ type: PUBLISHER_UPDATE_SUCCESS })
    dispatch({ type: PUBLISHER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PUBLISHER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}

export const deletePublisher = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PUBLISHER_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/publishers/${id}`, config)

    dispatch({ type: PUBLISHER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PUBLISHER_DELETE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    })
  }
}
