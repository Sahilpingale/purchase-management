import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {
  updateUser,
  getUserDetails,
  userUpdateReset,
} from '../actions/userActions'

const EditProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  // --- useSelector --- //
  // 1.UserDetails
  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  // 2.UserLogin
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // 3. UserUpdate
  const userUpdate = useSelector((state) => state.userUpdate)
  const { success: userUpdateSuccess } = userUpdate

  //--- useState ---//
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  // --- useEffect ---//
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.username) {
        dispatch(getUserDetails())
      } else {
        setUsername(user.username)
        setPassword('')
        setConfirmPassword('')
      }
      if (userUpdateSuccess) {
        history.push('/vendorMaster')
        dispatch(userUpdateReset())
      }
    }
    // }, [dispatch, history, userInfo, user, userUpdateSuccess])
  }, [user, userInfo, dispatch, history, userUpdateSuccess])

  // --- Handler ---//
  const submitHandler = (e) => {
    e.preventDefault()
    if (password) {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match')
      } else {
        dispatch(updateUser({ username, password }))
      }
    } else {
      dispatch(updateUser({ username }))
    }
  }

  return (
    <div>
      {message && <Message variant="danger">{message}</Message>}
      <FormContainer>
        <h2 className="mb-4">Edit Your Profile</h2>
        <Form onSubmit={submitHandler}>
          {/* Username */}
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              type="text"
              placeholder="Enter New Username"
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mt-2 mb-3 ">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>

          {/*Confirm Password */}
          <Form.Group className="mt-2 mb-3 ">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default EditProfileScreen
