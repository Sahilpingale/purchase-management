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
    case VENDOR_CREATE_RESET: {
      return {
        state: {},
      }
    }
    default:
      return state
  }
}

// 3. Get Vendor by Id
export const vendorDetailsReducer = (state = { vendor: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case VENDOR_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case VENDOR_DETAILS_SUCCESS:
      return {
        loading: false,
        vendor: payload,
      }
    case VENDOR_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case VENDOR_DETAILS_RESET:
      return {
        loading: false,
        vendor: {},
      }
    default:
      return state
  }
}

// 4. Update Vendor
export const vendorUpdateReducer = (state = { vendor: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case VENDOR_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case VENDOR_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case VENDOR_UPDATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case VENDOR_UPDATE_RESET:
      return {
        vendor: {},
      }
    default:
      return state
  }
}

// 5. Delete Vendor
export const vendorDeleteReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case VENDOR_DELETE_REQUEST:
      return {
        loading: true,
      }
    case VENDOR_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case VENDOR_DELETE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
