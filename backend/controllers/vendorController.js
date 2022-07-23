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

// @desc    Create Vendor
// @route   Post /api/vendors
// @access  Private

const createVendor = asyncHandler(async (req, res) => {
  const {
    company,
    person_name,
    contact_number_1,
    designation,
    area,
    plant_location,
    vendor_classification,
    email,
    category,
  } = req.body

  const vendorExists = await Vendor.findOne({ person_name })
  if (vendorExists) {
    res.status(400)
    throw new Error('Vendor already exists')
  }

  const contactNumber = contact_number_1
    .toString()
    .split(',')
    .map((number) => number.trim())

  const vendor = await Vendor.create({
    company,
    person_name,
    contact_number_1: contactNumber,
    designation,
    area,
    plant_location,
    vendor_classification,
    email,
    category,
  })

  if (vendor) {
    res.status(201).json({
      _id: vendor._id,
      person_name: vendor.person_name,
      contact_number_1: vendor.contact_number_1,
      designation: vendor.designation,
      area: vendor.area,
      plant_location: vendor.plant_location,
      vendor_classification: vendor.vendor_classification,
      email: vendor.email,
      category: vendor.category,
    })
  } else {
    res.status(400)
    throw new Error('Invalid Vendor Data')
  }
})

// @desc    Get Vendor by ID
// @route   GET /api/vendors/:id
// @access  Private

const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id)

  if (vendor) {
    res.json(vendor)
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})

// @desc    Update Vendor
// @route   PUT /api/vendors/:id
// @access  Private

const updateVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id)

  if (vendor) {
    vendor.company = req.body.company || vendor.company
    vendor.person_name = req.body.person_name || vendor.person_name
    vendor.contact_number_1 =
      req.body.contact_number_1 || vendor.contact_number_1
    vendor.designation = req.body.designation || vendor.designation
    vendor.area = req.body.area || vendor.area
    vendor.email = req.body.email || vendor.email
    vendor.plant_location = req.body.plant_location || vendor.plant_location
    vendor.category = req.body.category || vendor.category
    vendor.vendor_classification =
      req.body.vendor_classification || vendor.vendor_classification

    const updatedVendor = await vendor.save()

    res.json({
      message: 'Vendor Updates Successfully!',
    })
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})

export {
  getAllVendors,
  getVendorByCategory,
  createVendor,
  getVendorById,
  updateVendor,
}
