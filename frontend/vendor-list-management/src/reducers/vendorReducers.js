import {
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_RESET,
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
