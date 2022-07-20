import Vendor from '../models/vendorModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Private

const getAllVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({})
  res.json(vendors)
})

// @desc    Find by category
// @route   GET /api/vendors/category
// @access  Private

const getVendorByCategory = asyncHandler(async (req, res) => {
  const { category } = req.body
  const vendors = await Vendor.find({ category })
  res.json(vendors)
})

export { getAllVendors, getVendorByCategory }
