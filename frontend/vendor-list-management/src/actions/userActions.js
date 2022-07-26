import axios from 'axios'

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
} from '../constants/userConstants'
import { VENDOR_LIST_RESET } from '../constants/vendorConstants'

// 1. Login Action
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post(
      '/api/users/login',
      { username, password },
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    })
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// 2. Register Action
export const register = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post('/api/users', { username, password }, config)
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    })
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 3. Logout
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('vendors')
    dispatch({
      type: USER_LOGOUT,
    })
    dispatch({
      type: VENDOR_LIST_RESET,
    })
    document.location.href = '/login'
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 4. User Update
export const updateUser = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
    const res = await axios.put('/api/users/update', details, config)
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: res.data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    })
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 4.  Get User Details
export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const res = await axios.get('/api/users/profile', config)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 5.  User Details Reset
export const userDetailsReset = () => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_RESET,
  })
}

// 6.  User Update Reset
export const userUpdateReset = () => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_RESET,
  })
}
