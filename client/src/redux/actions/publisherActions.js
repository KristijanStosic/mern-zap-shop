import axios from 'axios'
import {
  PUBLISHER_LIST_REQUEST,
  PUBLISHER_LIST_SUCCESS,
  PUBLISHER_LIST_FAIL,
  PUBLISHER_DELETE_SUCCESS,
  PUBLISHER_DELETE_FAIL,
  PUBLISHER_DELETE_REQUEST,
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
