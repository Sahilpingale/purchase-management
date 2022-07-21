import axios from 'axios'
import {
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_RESET,
  VENDOR_CREATE_REQUEST,
  VENDOR_CREATE_SUCCESS,
  VENDOR_CREATE_FAIL,
} from '../constants/vendorConstants'

// 1. Get full vendor list
export const listVendors = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        // 'Content-Type': 'application/json',
      },
    }
    const res = await axios.get('/api/vendors', config)
    dispatch({
      type: VENDOR_LIST_SUCCESS,
      payload: res.data,
    })

    localStorage.setItem('vendors', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 2. Get vendor by category
export const getVendorByCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_LIST_RESET,
    })
    dispatch({
      type: VENDOR_LIST_REQUEST,
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
    const res = await axios.post('/api/vendors/category', category, config)
    dispatch({
      type: VENDOR_LIST_SUCCESS,
      payload: res.data,
    })

    localStorage.setItem('vendors', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 3. Create Vendor
export const createVendor = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_CREATE_REQUEST,
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
    const res = await axios.post('/api/vendors', details, config)
    dispatch({
      type: VENDOR_CREATE_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
