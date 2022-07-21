import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_RESET,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAIL,
} from '../constants/itemConstants'

// 1. Item List Reducer
const itemListReducer = (state = { items: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ITEM_LIST_REQUEST:
      return {
        loading: true,
      }
    case ITEM_LIST_SUCCESS:
      return {
        loading: false,
        items: payload,
      }
    case ITEM_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ITEM_LIST_RESET:
      return {
        loading: false,
        items: [],
      }
    default:
      return state
  }
}

// 2. Item Create Reducer
const itemCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ITEM_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ITEM_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ITEM_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export { itemListReducer, itemCreateReducer }
