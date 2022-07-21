import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_RESET,
} from '../constants/itemConstants'

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

export { itemListReducer }
