import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

const vendorMasterScreen = () => {
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
        <tbody>
          <tr>
            <td>Gold Plus</td>
            <td>Rakesh Jamwal</td>
            <td>9730041833</td>
            <td>9730041833</td>
            <td>Regional Manager</td>
            <td>West</td>
            <td>Glass</td>
            <td>Pune</td>
            <td>Manufacturer</td>
            <td>rakesh.jamwal@goldplusgroup.com</td>
          </tr>
          <tr>
            <td>Gold Plus</td>
            <td>Rakesh Jamwal</td>
            <td>9730041833</td>
            <td>9730041833</td>
            <td>Regional Manager</td>
            <td>West</td>
            <td>Glass</td>
            <td>Pune</td>
            <td>Manufacturer</td>
            <td>rakesh.jamwal@goldplusgroup.com</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default vendorMasterScreen
