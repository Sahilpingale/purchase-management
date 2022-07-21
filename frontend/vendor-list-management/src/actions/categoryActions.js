import axios from 'axios'
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
} from '../constants/categoryConstants'

// 1. Get vendor list
export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const res = await axios.get('/api/category', config)

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: res.data,
    })

    // localStorage.setItem('categories', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 2. Create Category
export const createCategories = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post('/api/category', { name }, config)

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: res.data,
    })

    // localStorage.setItem('categories', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
