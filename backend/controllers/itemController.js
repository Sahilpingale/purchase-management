import Item from '../models/itemModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Private

const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find({})
  res.send(items)
})

// @desc    Create Item
// @route   POST /api/items
// @access  Private

const createItems = asyncHandler(async (req, res) => {
  const {
    name,
    unitOfMeasurement,
    vendorName,
    clientName,
    rate,
    taxAmount,
    additionalCost,
    dateOfPurchase,
  } = req.body

  const item = await Item.create({
    name,
    unitOfMeasurement,
    vendorName,
    clientName,
    rate,
    taxAmount,
    additionalCost,
    dateOfPurchase,
  })

  if (item) {
    res.status(201).json({ message: 'Item Created' })
  } else {
    res.status(400)
    throw new Error('Invalid item data')
  }
})

// @desc    Get Items by category
// @route   GET /api/items/category
// @access  Private

const getItemByCategory = asyncHandler(async (req, res) => {
  const { category } = req.body
  const item = await Item.find({ name: category })
  res.json(item)
})

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)
  if (item) {
    await item.remove()
    res.json({ message: 'Item removed' })
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

export { getAllItems, createItems, getItemByCategory, deleteItem }
