import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { vendorListReducer } from './reducers/vendorReducers'
import { categoryListReducer } from './reducers/categoryReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  vendorList: vendorListReducer,
  categoryList: categoryListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const vendorListFromStorage = localStorage.getItem('vendors')
  ? JSON.parse(localStorage.getItem('vendors'))
  : []
// const categoryListFromStorage = localStorage.getItem('categories')
//   ? JSON.parse(localStorage.getItem('categories'))
//   : []

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  // vendorList: { vendors: vendorListFromStorage },
  // categoryList: { vendors: categoryListFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
