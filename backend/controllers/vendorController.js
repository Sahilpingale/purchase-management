import Vendor from '../models/vendorModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Public

const getAllVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({})
  res.json(vendors)
})

export { getAllVendors }
