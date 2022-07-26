import axios from 'axios'
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

// 1.Get all Items
export const listItems =
  (keyword = '') =>
  async (dispatch, getState) => {
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
      const res = await axios.get(`/api/items?keyword=${keyword}`, config)
      // const res = await axios.get(`/api/items`, config)

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

// 2. Create Item
export const createItem = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_CREATE_REQUEST,
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

    const res = await axios.post('/api/items', details, config)

    dispatch({
      type: ITEM_CREATE_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: ITEM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 3. Get Item by category
export const getItemByCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_LIST_RESET,
    })
    dispatch({
      type: ITEM_LIST_REQUEST,
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

    const res = await axios.post('/api/items/category', category, config)
    dispatch({
      type: ITEM_LIST_SUCCESS,
      payload: res.data,
    })

    // localStorage.setItem('vendors', JSON.stringify(res.data))
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

// 4. iTEM Details Reset
export const itemDetailsReset = () => async (dispatch) => {
  dispatch({
    type: ITEM_DETAILS_RESET,
  })
}

// 5. Get Item Details by ID
export const getItemDetailsById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_DETAILS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const res = await axios.get(`/api/items/${id}`, config)
    dispatch({
      type: ITEM_DETAILS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 6. Item Update Reset
export const itemUpdateReset = () => async (dispatch) => {
  dispatch({
    type: ITEM_UPDATE_RESET,
  })
}

// 7. Update Item
export const updateItem = (id, update) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_UPDATE_REQUEST,
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
    const res = await axios.put(`/api/items/${id}`, update, config)
    dispatch({
      type: ITEM_UPDATE_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 8. Delete Item
export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const res = await axios.delete(`/api/items/${id}`, config)
    dispatch({
      type: ITEM_DELETE_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: ITEM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 9. Item create Reset
export const itemCreateReset = () => async (dispatch) => {
  dispatch({
    type: ITEM_CREATE_RESET,
  })
}
