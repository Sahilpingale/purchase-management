import {
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_RESET,
  VENDOR_CREATE_REQUEST,
  VENDOR_CREATE_SUCCESS,
  VENDOR_CREATE_FAIL,
} from '../constants/vendorConstants'

// 1. Get Vendor List
export const vendorListReducer = (state = { vendors: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case VENDOR_LIST_REQUEST:
      return { loading: true, vendors: [] }
    case VENDOR_LIST_SUCCESS:
      return {
        loading: false,
        vendors: payload,
      }
    case VENDOR_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case VENDOR_LIST_RESET:
      return {
        loading: false,
        vendors: [],
      }
    default:
      return state
  }
}

// 2. Create Vendor
export const vendorCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case VENDOR_CREATE_REQUEST:
      return {
        loading: true,
      }
    case VENDOR_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case VENDOR_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
