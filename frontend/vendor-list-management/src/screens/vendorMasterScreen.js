import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, DropdownButton, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listVendors, getVendorByCategory } from '../actions/vendorActions'
import { listCategories } from '../actions/categoryActions'

const VendorMasterScreen = ({ history }) => {
  const dispatch = useDispatch()

  const vendorList = useSelector((state) => state.vendorList)
  const { loading, vendors } = vendorList

  const categoryList = useSelector((state) => state.categoryList)
  const { loading: category_loading, categories } = categoryList

  const [category, setCategory] = useState('All')

  useEffect(() => {
    dispatch(listCategories())
    if (category === 'All') {
      dispatch(listVendors())
    } else {
      dispatch(getVendorByCategory({ category }))
    }
  }, [category])

  const test = (e) => {
    setCategory(e.target.value)
  }

  return (
    <>
      {!category_loading && (
        <select value={category} onChange={test}>
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Company</th>
              <th>Person Name</th>
              <th>Contact Number 1</th>
              <th>Contact number 2</th>
              <th>Designation</th>
              <th>Area</th>
              <th>Material</th>
              <th>Plant Location</th>
              <th>Vendor Classification</th>
              <th>Mail ID</th>
            </tr>
          </thead>
          <tbody>
            {/* {category === 'All' && */}
            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.company}</td>
                <td>{vendor.person_name}</td>
                <td>{vendor.contact_number_1}</td>
                <td>{vendor.contact_number_2}</td>
                <td>{vendor.designation}</td>
                <td>{vendor.area}</td>
                <td>{vendor.category}</td>
                <td>{vendor.plant_location}</td>
                <td>{vendor.vendor_classification}</td>
                <td>{vendor.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default VendorMasterScreen
