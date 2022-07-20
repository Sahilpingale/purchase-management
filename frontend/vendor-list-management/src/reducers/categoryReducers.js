import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET,
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
