import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc    Test get all users
// @route   GET /api/users
// @access  Public

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invlid username or password')
  }
})

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const checkUserExists = await User.findOne({ username })
  if (checkUserExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    username,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Update User
// @route   PUT /api/users
// @access  Private

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.username = req.body.username || user.username
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, getAllUsers, registerUser, updateUser, getUserProfile }
