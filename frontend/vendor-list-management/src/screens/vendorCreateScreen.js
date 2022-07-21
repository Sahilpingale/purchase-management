import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { listCategories, createCategories } from '../actions/categoryActions'
import { createVendor } from '../actions/vendorActions'

const VendorCreateScreen = ({ history }) => {
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)
  const { loading: category_loading, categories } = categoryList

  // useState for form
  const [company, setCompany] = useState('')
  const [person_name, setPerson_name] = useState('')
  const [contact_number_1, setContact_number_1] = useState('')
  const [contact_number_2, setContact_number_2] = useState('')
  const [designation, setDesignation] = useState('')
  const [area, setArea] = useState('')
  const [plant_location, setPlant_location] = useState('')
  const [vendor_classification, setVendor_classification] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('')
  const [categoryDD, setCategoryDD] = useState('')

  useEffect(() => {
    dispatch(listCategories())
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    // history.push('/vendorMaster')

    // console.log(category)
    // console.log(categoryDD)

    if (category !== '') {
      dispatch(
        createVendor({
          company,
          person_name,
          contact_number_1,
          contact_number_2,
          designation,
          area,
          category,
          plant_location,
          vendor_classification,
          email,
        })
      )
      dispatch(createCategories(category))
    } else {
      dispatch(
        createVendor({
          company,
          person_name,
          contact_number_1,
          contact_number_2,
          designation,
          area,
          category: categoryDD,
          plant_location,
          vendor_classification,
          email,
        })
      )
    }
  }

  const ddClickHandler = () => {
    setCategory('')
  }

  const textClickHandler = () => {
    setCategoryDD('')
  }

  return (
    <>
      <FormContainer>
        <h2 className="mb-4">Add Vendor Details</h2>
        <Form onSubmit={submitHandler}>
          <Form.Text className="text-muted mb-3">
            Fields marked with * are mandatory
          </Form.Text>

          {/* Company */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Company *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Company"
              onChange={(e) => setCompany(e.target.value)}
            />
          </Form.Group>

          {/* Person Name */}
          <Form.Group className="mb-3">
            <Form.Label>Person Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Person Name"
              onChange={(e) => setPerson_name(e.target.value)}
            />
          </Form.Group>

          {/* Number 1 */}
          <Form.Group className="mb-3">
            <Form.Label>Contact Number 1</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Contact Number"
              onChange={(e) => setContact_number_1(e.target.value)}
            />
          </Form.Group>

          {/* Number 2 */}
          <Form.Group className="mb-3">
            <Form.Label>Contact Number 2</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Contact Number"
              onChange={(e) => setContact_number_2(e.target.value)}
            />
          </Form.Group>

          {/* Designation */}
          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Designation"
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Form.Group>

          {/* Area */}
          <Form.Group className="mb-3">
            <Form.Label>Area</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Area"
              onChange={(e) => setArea(e.target.value)}
            />
          </Form.Group>

          {/* disabled={category !== '-' ? true : null} */}
          {/* Material Text box */}
          <Form.Group className="mb-3">
            <Form.Label>Material *</Form.Label>
            <Form.Control
              value={category}
              type="text"
              placeholder="Enter Material"
              onChange={(e) => setCategory(e.target.value)}
              onClick={textClickHandler}
            />
          </Form.Group>

          <Form.Text className="text-muted mb-3">OR</Form.Text>

          {/* Material Drop Down */}
          <div className="mb-5 mt-3">
            {!category_loading && (
              <select
                value={categoryDD}
                onChange={(e) => setCategoryDD(e.target.value)}
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

          {/* Plant Location */}
          <Form.Group className="mb-3">
            <Form.Label>Plant Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Plant Location"
              onChange={(e) => setPlant_location(e.target.value)}
            />
          </Form.Group>

          {/* Vendor Classification */}
          <Form.Group className="mb-3">
            <Form.Label>Vendor Classification</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Vendor Classification"
              onChange={(e) => setVendor_classification(e.target.value)}
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Mail ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mail ID"
              onChange={(e) => setEmail(e.target.value)}
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

export default VendorCreateScreen
