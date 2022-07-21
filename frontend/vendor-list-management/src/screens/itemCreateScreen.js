import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { listCategories } from '../actions/categoryActions'
import { createItem } from '../actions/itemActions'
import Message from '../components/Message'

const ItemCreateScreen = () => {
  const dispatch = useDispatch()

  // useSelectors
  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: category_loading,
    categories,
    error: categoryListError,
  } = categoryList

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { loading: categoryCreateLoading, error: categoryCreateError } =
    categoryCreate

  const itemCreate = useSelector((state) => state.itemCreate)
  const {
    success: itemCreateSuccess,
    loading: itemCreateLoading,
    error: itemCreateError,
  } = itemCreate

  // useState for form

  useEffect(() => {
    dispatch(listCategories())
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Submit')
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
            <Form.Control type="text" placeholder="Enter Purchased Item" />
          </Form.Group>

          {/* Vendor Name */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Vendor Name *</Form.Label>
            <Form.Control type="text" placeholder="Enter Vendor Name" />
          </Form.Group>

          {/* Client Name */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Client Name *</Form.Label>
            <Form.Control type="text" placeholder="Enter Client Name" />
          </Form.Group>

          {/* Rate */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Rate *</Form.Label>
            <Form.Control type="text" placeholder="Enter Rate" />
          </Form.Group>

          {/* Tax Amount */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Tax Amount *</Form.Label>
            <Form.Control type="text" placeholder="Enter Tax Amount" />
          </Form.Group>

          {/* Additional Cost */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Additional Cost </Form.Label>
            <Form.Control type="text" placeholder="Enter Additional Cost" />
          </Form.Group>

          {/* Date Of Purchase */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Date Of Purchase *</Form.Label>
            <Form.Control type="text" placeholder="Enter Date Of Purchase" />
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
