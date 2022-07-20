import axios from 'axios'
import {
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
} from '../constants/vendorConstants'

// 1. Get vendor list
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
