import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { listItems } from '../actions/itemActions'

const ItemViewScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listItems())
  }, [dispatch])

  return <div>itemViewScreen</div>
}
export default ItemViewScreen
