import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
} from '../constants/categoryConstants'

// 1. Get Category List
export const categoryListReducer = (state = { categories: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case CATEGORY_LIST_REQUEST:
      return {
        loading: true,
      }
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: payload,
      }
    case CATEGORY_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case CATEGORY_LIST_RESET:
      return {
        loading: false,
        categories: [],
      }
    default:
      return state
  }
}

// 2. Create Category
export const categoryCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CATEGORY_CREATE_REQUEST:
      return {
        loading: true,
      }
    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
