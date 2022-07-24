import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { listCategories, createCategories } from '../actions/categoryActions'
import {
  updateItem,
  itemCreateReset,
  getItemDetailsById,
} from '../actions/itemActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ItemCreateScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const userId = match.params.id

  //--- useSelectors --- //

  // 1.Category List
  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: category_loading,
    categories,
    error: categoryListError,
  } = categoryList

  // 2.Create Category
  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { error: categoryCreateError } = categoryCreate

  // 3. Item Update
  const itemUpdate = useSelector((state) => state.itemUpdate)
  const { success: itemUpdateSuccess, error: itemUpdateError } = itemUpdate

  // 4. User Login Info
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // 5.Item Details
  const itemDetails = useSelector((state) => state.itemDetails)
  const {
    loading: itemDetailsLoading,
    error: itemDetailsError,
    item,
  } = itemDetails

  //--- useState for form ---//
  const [name, setName] = useState('')
  const [nameDD, setNameDD] = useState('')
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('')
  const [vendorName, setVendorName] = useState('')
  const [clientName, setClientName] = useState('')
  const [rate, setRate] = useState('')
  const [taxAmount, setTaxAmount] = useState('')
  const [additionalCost, setAdditionalCost] = useState('')
  const [dateOfPurchase, setDateofPurchase] = useState('')

  //--- useEffect ---//
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (itemUpdateSuccess) {
        history.push('/itemMaster')
      } else {
        dispatch(listCategories())
        if (!item || !item.name) {
          dispatch(getItemDetailsById(userId))
        } else {
          setNameDD(item.name)
          setUnitOfMeasurement(item.unitOfMeasurement)
          setAdditionalCost(item.additionalCost)
          setTaxAmount(item.taxAmount)
          setClientName(item.clientName)
          setVendorName(item.vendorName)
          setRate(item.rate)
        }
      }
    }
  }, [history, item, userInfo, itemUpdateSuccess])

  //--- Handlers ---//
  const submitHandler = (e) => {
    e.preventDefault()
    if (name !== '') {
      dispatch(
        updateItem(userId, {
          name,
          unitOfMeasurement,
          vendorName,
          clientName,
          rate,
          taxAmount,
          additionalCost,
          dateOfPurchase,
        })
      )
      dispatch(createCategories(name))
    } else {
      dispatch(
        updateItem(userId, {
          name: nameDD,
          unitOfMeasurement,
          vendorName,
          clientName,
          rate,
          taxAmount,
          additionalCost,
          dateOfPurchase,
        })
      )
    }
  }
  const ddClickHandler = (e) => {
    setName('')
  }
  const textClickHandler = () => {
    setNameDD('')
  }

  return (
    <>
      {itemUpdateSuccess && <Message variant="success">Item Updated</Message>}
      {categoryListError && (
        <Message variant="danger">{categoryListError}</Message>
      )}
      {categoryCreateError && (
        <Message variant="danger">{categoryCreateError}</Message>
      )}
      {itemUpdateError && <Message variant="danger">{itemUpdateError}</Message>}
      {itemDetailsLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h2 className="mb-4">Update Item Details</h2>
          <Form onSubmit={submitHandler}>
            <Form.Text className="text-muted mb-3">
              Fields marked with * are mandatory
            </Form.Text>

            {/* Purchase Item */}
            <Form.Group className="mt-2 mb-3">
              <Form.Label> Purchased Item *</Form.Label>

              <div>
                <Form.Text className="text-muted mb-3">
                  Select from Category Dropdown
                </Form.Text>
              </div>
              {/* Purchase Item Drop Down */}
              <div className="mt-1 ">
                {!category_loading && (
                  <select
                    value={nameDD}
                    onChange={(e) => setNameDD(e.target.value)}
                    onClick={ddClickHandler}
                  >
                    <option value="-">----</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <Form.Text className="text-muted mb-3">OR</Form.Text>

              <Form.Control
                value={name}
                onClick={textClickHandler}
                type="text"
                placeholder="Enter Purchased Item"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            {/* Vendor Name */}
            <Form.Group className="mt-2 mb-3">
              <Form.Label>Vendor Name *</Form.Label>
              <Form.Control
                value={vendorName}
                type="text"
                placeholder="Enter Vendor Name"
                onChange={(e) => setVendorName(e.target.value)}
              />
            </Form.Group>

            {/* Client Name */}
            <Form.Group className="mt-2 mb-3">
              <Form.Label>Client Name *</Form.Label>
              <Form.Control
                value={clientName}
                type="text"
                placeholder="Enter Client Name"
                onChange={(e) => setClientName(e.target.value)}
              />
            </Form.Group>

            {/* Unit of Measurement */}
            <Form.Group className="mt-2 mb-3">
              <Form.Label>Unit of Measurement *</Form.Label>
              <Form.Control
                value={unitOfMeasurement}
                type="text"
                placeholder="Enter Unit of Measurement (Area, length, units)"
                onChange={(e) => setUnitOfMeasurement(e.target.value)}
              />
            </Form.Group>

            {/* Rate */}
            <Form.Group className="mt-2 mb-3">
              <Form.Label>Rate *</Form.Label>
              <Form.Control
                value={rate}
                type="text"
                placeholder="Enter Rate"
                onChange={(e) => setRate(e.target.value)}
              />
            </Form.Group>

            {/* Tax Amount */}
            <Form.Group className="mt-2 mb-3">
              <Form.Label>Tax Amount</Form.Label>
              <Form.Control
                value={taxAmount}
                type="text"
                placeholder="Enter Tax Amount"
                onChange={(e) => setTaxAmount(e.target.value)}
              />
            </Form.Group>

            {/* Additional Cost */}
            <Form.Group className="mt-2 mb-3">
              <Form.Label>Additional Cost</Form.Label>
              <Form.Control
                value={additionalCost}
                type="text"
                placeholder="Enter Additional Cost"
                onChange={(e) => setAdditionalCost(e.target.value)}
              />
            </Form.Group>

            {/* Date Of Purchase */}
            <Form.Group className="mt-2 mb-3">
              <Form.Label>Date Of Purchase</Form.Label>
              <Form.Control
                value={dateOfPurchase}
                type="text"
                placeholder="Enter Date Of Purchase"
                onChange={(e) => setDateofPurchase(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}

export default ItemCreateScreen
