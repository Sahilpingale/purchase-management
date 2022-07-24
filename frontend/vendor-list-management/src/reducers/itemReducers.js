import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_RESET,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAIL,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_RESET,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_RESET,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_CREATE_RESET,
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
    case ITEM_CREATE_RESET:
      return {
        state: {},
      }
    default:
      return state
  }
}

// 3. Get item by Id
const itemDetailsReducer = (state = { item: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case ITEM_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ITEM_DETAILS_SUCCESS:
      return {
        loading: false,
        item: payload,
      }
    case ITEM_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ITEM_DETAILS_RESET:
      return {
        loading: false,
        item: {},
      }
    default:
      return state
  }
}

// 4. Update Item
const itemUpdateReducer = (state = { item: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case ITEM_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ITEM_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ITEM_UPDATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ITEM_UPDATE_RESET:
      return {
        item: {},
      }
    default:
      return state
  }
}

// 5. Delete ITEM
const itemDeleteReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ITEM_DELETE_REQUEST:
      return {
        loading: true,
      }
    case ITEM_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ITEM_DELETE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export {
  itemListReducer,
  itemCreateReducer,
  itemUpdateReducer,
  itemDetailsReducer,
  itemDeleteReducer,
}
