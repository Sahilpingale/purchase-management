import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Test get all users
// @route   GET /api/users
// @access  Public

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export { getAllUsers }
