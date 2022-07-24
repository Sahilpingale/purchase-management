import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { listCategories, createCategories } from '../actions/categoryActions'
import { createItem, itemCreateReset } from '../actions/itemActions'
import Message from '../components/Message'

const ItemCreateScreen = ({ history }) => {
  const dispatch = useDispatch()

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

  // 3. Item Create
  const itemCreate = useSelector((state) => state.itemCreate)
  const { success: itemCreateSuccess, error: itemCreateError } = itemCreate

  // 4. User Login Info
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
      if (itemCreateSuccess) {
        history.push('/itemMaster')
        dispatch(itemCreateReset())
      }
      dispatch(listCategories())
    }
  }, [history, dispatch, userInfo, itemCreateSuccess])

  //--- Handlers ---//
  const submitHandler = (e) => {
    e.preventDefault()
    if (name !== '') {
      dispatch(
        createItem({
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
        createItem({
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
      {itemCreateSuccess && <Message variant="success">Item created</Message>}
      {categoryListError && (
        <Message variant="danger">{categoryListError}</Message>
      )}
      {categoryCreateError && (
        <Message variant="danger">{categoryCreateError}</Message>
      )}
      {itemCreateError && <Message variant="danger">{itemCreateError}</Message>}

      <FormContainer>
        <h2 className="mb-4">Add Item Details</h2>
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
              type="text"
              placeholder="Enter Vendor Name"
              onChange={(e) => setVendorName(e.target.value)}
            />
          </Form.Group>

          {/* Client Name */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Client Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Client Name"
              onChange={(e) => setClientName(e.target.value)}
            />
          </Form.Group>

          {/* Unit of Measurement */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Unit of Measurement *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Unit of Measurement (Area, length, units)"
              onChange={(e) => setUnitOfMeasurement(e.target.value)}
            />
          </Form.Group>

          {/* Rate */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Rate *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Rate"
              onChange={(e) => setRate(e.target.value)}
            />
          </Form.Group>

          {/* Tax Amount */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Tax Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Tax Amount"
              onChange={(e) => setTaxAmount(e.target.value)}
            />
          </Form.Group>

          {/* Additional Cost */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Additional Cost</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Additional Cost"
              onChange={(e) => setAdditionalCost(e.target.value)}
            />
          </Form.Group>

          {/* Date Of Purchase */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Date Of Purchase</Form.Label>
            <Form.Control
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
    </>
  )
}

export default ItemCreateScreen
