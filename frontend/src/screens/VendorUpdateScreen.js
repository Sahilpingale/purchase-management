import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { listCategories, createCategories } from '../actions/categoryActions'
import { getVendorDetailsById, updateVendor } from '../actions/vendorActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const VendorUpdateScreen = ({ history, match }) => {
  const userId = match.params.id
  const dispatch = useDispatch()

  //--- useSelectors ---//
  // 1.UserLogin
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // 2.CategoryList
  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: category_loading,
    categories,
    error: categoryListError,
  } = categoryList

  // 3.CatergoryCreate
  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { error: categoryCreateError } = categoryCreate

  // 4.VendorUpdate
  const vendorUpdate = useSelector((state) => state.vendorUpdate)
  const {
    success: vendorUpdateSuccess,

    error: vendorUpdateError,
  } = vendorUpdate

  // 5.Vendor Details
  const vendorDetails = useSelector((state) => state.vendorDetails)
  const { loading: vendorDetailsLoading, vendor } = vendorDetails

  //--- useState for form ---//
  const [company, setCompany] = useState(vendor.company)
  const [person_name, setPerson_name] = useState('')
  const [contact_number_1, setContact_number_1] = useState([])
  const [designation, setDesignation] = useState('')
  const [area, setArea] = useState('')
  const [plant_location, setPlant_location] = useState('')
  const [vendor_classification, setVendor_classification] = useState('')
  const [email, setEmail] = useState('')
  const [remarks, setRemarks] = useState('')
  const [category, setCategory] = useState('')
  const [categoryDD, setCategoryDD] = useState('')

  // ---UseEffect ---//
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (vendorUpdateSuccess) {
        history.push('/vendorMaster')
      }
      dispatch(listCategories())
      if (!vendor || !vendor.company) {
        dispatch(getVendorDetailsById(userId))
      } else {
        setCompany(vendor.company)
        setPerson_name(vendor.person_name)
        setContact_number_1(vendor.contact_number_1)
        setDesignation(vendor.designation)
        setArea(vendor.area)
        setPlant_location(vendor.plant_location)
        setVendor_classification(vendor.vendor_classification)
        setEmail(vendor.email)
        setRemarks(vendor.remarks)
        setCategoryDD(vendor.category)
      }
    }
  }, [dispatch, history, userInfo, userId, vendor, vendorUpdateSuccess])

  // ---Handlers ---//
  const submitHandler = (e) => {
    e.preventDefault()
    if (category !== '') {
      dispatch(
        updateVendor(userId, {
          company,
          person_name,
          contact_number_1,
          designation,
          area,
          category,
          plant_location,
          vendor_classification,
          email,
          remarks,
        })
      )
      dispatch(createCategories(category))
    } else {
      dispatch(
        updateVendor(userId, {
          company,
          person_name,
          contact_number_1,
          designation,
          area,
          category: categoryDD,
          plant_location,
          vendor_classification,
          email,
          remarks,
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
      {vendorUpdateSuccess && (
        <Message variant="success">Vendor Updated</Message>
      )}
      {categoryListError && (
        <Message variant="danger">{categoryListError}</Message>
      )}
      {categoryCreateError && (
        <Message variant="danger">{categoryCreateError}</Message>
      )}
      {vendorUpdateError && (
        <Message variant="danger">{vendorUpdateError}</Message>
      )}
      {vendorDetailsLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h2 className="mb-4">Update Vendor Details</h2>
          <Form onSubmit={submitHandler}>
            <Form.Text className="text-muted mb-3">
              Fields marked with * are mandatory
            </Form.Text>

            {/* Company */}
            <Form.Group className="mt-2 mb-3 ">
              <Form.Label>Company *</Form.Label>
              <Form.Control
                value={company}
                type="text"
                placeholder="Enter Company"
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            {/* Person Name */}
            <Form.Group className="mb-3">
              <Form.Label>Person Name *</Form.Label>
              <Form.Control
                value={person_name}
                type="text"
                placeholder="Enter Person Name"
                onChange={(e) => setPerson_name(e.target.value)}
              />
            </Form.Group>

            {/* Number 1 */}
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                value={contact_number_1}
                type="text"
                placeholder="Enter Contact Number"
                onChange={(e) => setContact_number_1(e.target.value)}
              />
            </Form.Group>

            {/* Designation */}
            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                value={designation}
                type="text"
                placeholder="Enter Designation"
                onChange={(e) => setDesignation(e.target.value)}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Mail ID</Form.Label>
              <Form.Control
                value={email}
                type="text"
                placeholder="Enter Mail ID"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {/* Visit Date */}
            <Form.Group className="mb-3">
              <Form.Label>Visit Date</Form.Label>
              <Form.Control
                value={remarks}
                type="text"
                placeholder="Enter Visit Date"
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Form.Group>

            {/* Area */}
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                value={area}
                type="text"
                placeholder="Enter Area"
                onChange={(e) => setArea(e.target.value)}
              />
            </Form.Group>

            {/* disabled={category !== '-' ? true : null} */}
            {/* Material Text box */}
            <Form.Group className="mb-1">
              <Form.Label>Material *</Form.Label>
              <Form.Control
                value={category}
                type="text"
                placeholder="Enter Material"
                onChange={(e) => setCategory(e.target.value)}
                onClick={textClickHandler}
              />
            </Form.Group>

            <Form.Text className="text-muted mb-1">
              &nbsp;&nbsp;&nbsp;OR Choose from Dropdown
            </Form.Text>

            {/* Material Drop Down */}
            <div className="mb-3 mt-1">
              {!category_loading && (
                <select
                  value={categoryDD}
                  onChange={(e) => setCategoryDD(e.target.value)}
                  onClick={ddClickHandler}
                  className="width-100"
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
                value={plant_location}
                type="text"
                placeholder="Enter Plant Location"
                onChange={(e) => setPlant_location(e.target.value)}
              />
            </Form.Group>

            {/* Vendor Classification */}
            <Form.Group className="mb-3">
              <Form.Label>Vendor Classification</Form.Label>
              <Form.Control
                value={vendor_classification}
                type="text"
                placeholder="Enter Vendor Classification"
                onChange={(e) => setVendor_classification(e.target.value)}
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

export default VendorUpdateScreen
