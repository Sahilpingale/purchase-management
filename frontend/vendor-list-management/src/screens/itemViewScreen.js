import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listItems } from '../actions/itemActions'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listCategories } from '../actions/categoryActions'
import {
  getItemByCategory,
  itemDetailsReset,
  itemUpdateReset,
  deleteItem,
} from '../actions/itemActions'
import { vendorDetailsReset, vendorUpdateReset } from '../actions/vendorActions'

const ItemViewScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [category, setCategory] = useState('All')

  // --- useSelectors --- //
  // 1.UserLogin
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // 2. itemList
  const itemList = useSelector((state) => state.itemList)
  const { items, loading: itemListLoading, error: itemListError } = itemList

  // 3.CategoryList
  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: categoryLoading,
    categories,
    error: categoryError,
  } = categoryList

  // 4.itemDelete
  const itemDelete = useSelector((state) => state.itemDelete)
  const { success: itemDeleteSuccess } = itemDelete

  // --- useEffect ---//
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      // Resets
      dispatch(vendorDetailsReset())
      dispatch(vendorUpdateReset())
      dispatch(itemDetailsReset())
      dispatch(itemUpdateReset())

      dispatch(listCategories())
      if (category === 'All') {
        dispatch(listItems())
      } else {
        dispatch(getItemByCategory({ category }))
      }
    }
  }, [category, history, userInfo, itemDeleteSuccess])

  // --- Handlers ---//
  const test = (e) => {
    setCategory(e.target.value)
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you want to delete?')) {
      dispatch(deleteItem(id))
    }
  }
  return (
    <>
      {itemListError && <Message variant="danger">{itemListError}</Message>}
      {categoryError && <Message variant="danger">{categoryError}</Message>}

      {!categoryLoading && (
        <select value={category} onChange={test}>
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      )}
      {itemListLoading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Purchased Item</th>
              <th>Vendor Name</th>
              <th>Client Name</th>
              <th>Rate</th>
              <th>Tax Amount</th>
              <th>Additional Cost</th>
              <th>Date Of Purchase</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.vendorName}</td>
                <td>{item.clientName}</td>
                <td>{item.rate}</td>
                <td>{item.taxAmount}</td>
                <td>{item.additionalCost}</td>
                <td>{item.dateOfPurchase}</td>
                <td>
                  <LinkContainer to={`/items/${item._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    onClick={() => deleteHandler(item._id)}
                    variant="light"
                    className="btn-sm"
                  >
                    <i className="fas fa-trash" style={{ color: 'red' }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default ItemViewScreen
