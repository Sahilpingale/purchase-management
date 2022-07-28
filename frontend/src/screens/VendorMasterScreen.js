import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listVendors,
  getVendorByCategory,
  vendorDetailsReset,
  vendorUpdateReset,
  deleteVendor,
} from '../actions/vendorActions'
import { itemDetailsReset, itemUpdateReset } from '../actions/itemActions'
import { listCategories } from '../actions/categoryActions'
import { userDetailsReset } from '../actions/userActions'
import { Route } from 'react-router-dom'
import SearchBox from '../components/SearchBox'

const VendorMasterScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const keyword = match.params.keyword

  // --- useSelectors --- //
  // 1. User Login
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // 2. VendorList
  const vendorList = useSelector((state) => state.vendorList)
  const { loading, vendors, error } = vendorList

  // 3. CategoryList
  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: category_loading,
    categories,
    error: category_error,
  } = categoryList

  // 4. VendorDelete
  const vendorDelete = useSelector((state) => state.vendorDelete)
  const { success: deleteSuccess } = vendorDelete

  // --- useState --- //
  const [category, setCategory] = useState('All')

  // --- useEffect --- //
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      // Resets
      dispatch(vendorDetailsReset())
      dispatch(vendorUpdateReset())
      dispatch(itemDetailsReset())
      dispatch(itemUpdateReset())
      dispatch(userDetailsReset())

      dispatch(listCategories())
      if (category === 'All') {
        dispatch(listVendors(keyword))
      } else {
        dispatch(getVendorByCategory({ category }))
      }
    }
  }, [dispatch, history, userInfo, category, deleteSuccess, keyword])

  // --- Handlers --- //
  const test = (e) => {
    setCategory(e.target.value)
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you want to delete?')) {
      dispatch(deleteVendor(id))
    }
  }
  const resetCategory = () => {
    setCategory('All')
  }

  return (
    <>
      <h2 className="mb-4">Vendor Master</h2>
      {/* If Errors */}
      {error && <Message variant="danger">{error}</Message>}
      {category_error && <Message variant="danger">{category_error}</Message>}

      <div className="flex">
        {/* Category Dropdown */}
        {!category_loading && (
          <div>
            <p className="category-tag">Category</p>
            <select
              className="dropdown custom-select"
              value={category}
              onChange={test}
            >
              <option value="All">All</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Box */}
        {!category_loading && (
          <div>
            <Route
              render={({ history }) => (
                <SearchBox
                  history={history}
                  search="vendorMaster"
                  resetCategoryFunc={resetCategory}
                />
              )}
            />
          </div>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Company</th>
              <th>Name</th>
              <th>Contact </th>
              <th>Designation</th>
              <th>Mail ID</th>
              <th>Visit_Date</th>
              <th>Area</th>
              <th>Material</th>
              <th>Plant_Location</th>
              <th>Vendor_Classification </th>
            </tr>
          </thead>
          <tbody>
            {/* {category === 'All' && */}
            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.company}</td>
                <td>{vendor.person_name}</td>
                <td>
                  {vendor.contact_number_1.map((no, index) => (
                    <a key={no.index} className="links" href={`tel:${no}`}>
                      {no}{' '}
                      {vendor.contact_number_1.length > 1 &&
                        index !== vendor.contact_number_1.length - 1 && <>,</>}
                    </a>
                  ))}{' '}
                </td>
                <td>{vendor.designation}</td>
                <td>
                  <a className="links" href={`mailto:${vendor.email}`}>
                    {vendor.email}
                  </a>
                </td>
                <td>{vendor.remarks}</td>
                <td>{vendor.area}</td>
                <td>{vendor.category}</td>
                <td>{vendor.plant_location}</td>
                <td>{vendor.vendor_classification}</td>
                <td>
                  <LinkContainer to={`/vendors/${vendor._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    onClick={() => deleteHandler(vendor._id)}
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

export default VendorMasterScreen
