import axios from 'axios'
import {
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_RESET,
  VENDOR_CREATE_REQUEST,
  VENDOR_CREATE_SUCCESS,
  VENDOR_CREATE_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_DETAILS_FAIL,
  VENDOR_DETAILS_RESET,
  VENDOR_UPDATE_REQUEST,
  VENDOR_UPDATE_SUCCESS,
  VENDOR_UPDATE_FAIL,
  VENDOR_UPDATE_RESET,
  VENDOR_DELETE_REQUEST,
  VENDOR_DELETE_SUCCESS,
  VENDOR_DELETE_FAIL,
  VENDOR_CREATE_RESET,
} from '../constants/vendorConstants'

// 1. Get full vendor list
export const listVendors =
  (keyword = '') =>
  async (dispatch, getState) => {
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
      const res = await axios.get(`/api/vendors?keyword=${keyword}`, config)
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

// 4. Vendor Details Reset
export const vendorDetailsReset = () => async (dispatch) => {
  dispatch({
    type: VENDOR_DETAILS_RESET,
  })
}

// 5. Get Vendor Details by ID
export const getVendorDetailsById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_DETAILS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const res = await axios.get(`/api/vendors/${id}`, config)
    dispatch({
      type: VENDOR_DETAILS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 6. Vendor Update Reset
export const vendorUpdateReset = () => async (dispatch) => {
  dispatch({
    type: VENDOR_UPDATE_RESET,
  })
}

// 7. Update Vendor
export const updateVendor = (id, update) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_UPDATE_REQUEST,
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
    const res = await axios.put(`/api/vendors/${id}`, update, config)
    dispatch({
      type: VENDOR_UPDATE_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 8. Delete Vendor
export const deleteVendor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const res = await axios.delete(`/api/vendors/${id}`, config)
    dispatch({
      type: VENDOR_DELETE_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//9. VENDOR_CREATE_RESET
export const vendorCreateReset = () => async (dispatch) => {
  dispatch({
    type: VENDOR_CREATE_RESET,
  })
}
