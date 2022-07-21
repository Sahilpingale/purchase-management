import Item from '../models/itemModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Private

const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find({})
  res.send(items)
})

export { getAllItems }
