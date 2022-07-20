import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listVendors } from '../actions/vendorActions'

const VendorMasterScreen = ({ history }) => {
  const dispatch = useDispatch()

  const vendorList = useSelector((state) => state.vendorList)
  const { loading, vendors } = vendorList

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listVendors())
  }, [])

  return (
    <>
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
      </Table>
    </>
  )
}

export default VendorMasterScreen
