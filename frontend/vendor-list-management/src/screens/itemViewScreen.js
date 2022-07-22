import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listItems } from '../actions/itemActions'
import { Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listCategories } from '../actions/categoryActions'
import { getItemByCategory } from '../actions/itemActions'

const ItemViewScreen = () => {
  const dispatch = useDispatch()

  const [category, setCategory] = useState('All')

  useEffect(() => {
    dispatch(listCategories())
    if (category === 'All') {
      dispatch(listItems())
    } else {
      dispatch(getItemByCategory({ category }))
    }
  }, [category])

  // useSelectors
  const itemList = useSelector((state) => state.itemList)
  const { items, loading: itemListLoading, error: itemListError } = itemList

  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: categoryLoading,
    categories,
    error: categoryError,
  } = categoryList

  const test = (e) => {
    setCategory(e.target.value)
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default ItemViewScreen
