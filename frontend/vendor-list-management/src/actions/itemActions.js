import axios from 'axios'
import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_RESET,
} from '../constants/itemConstants'

//   1.Get all Items
export const listItems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const res = await axios.get('api/items', config)

    dispatch({
      type: ITEM_LIST_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: ITEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
