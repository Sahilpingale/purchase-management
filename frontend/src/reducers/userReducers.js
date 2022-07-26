import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
} from '../constants/userConstants'

// 1. User Login
export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

// 2. User Register
export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
// 3. User Update
export const userUpdateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case USER_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

// 4. User Details
export const userDetailsReducer = (state = { user: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: payload,
      }
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case USER_DETAILS_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}
