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

// @desc    Delete Item
// @route   DELETE /api/items/:id
// @access  Private
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

// @desc    Get Item by ID
// @route   GET /api/items/:id
// @access  Private

const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (item) {
    res.json(item)
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

// @desc    Update Item
// @route   PUT /api/items/:id
// @access  Private

const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (item) {
    item.name = req.body.name || item.name
    item.unitOfMeasurement =
      req.body.unitOfMeasurement || item.unitOfMeasurement
    item.vendorName = req.body.vendorName || item.vendorName
    item.clientName = req.body.clientName || item.clientName
    item.rate = req.body.rate || item.rate
    item.taxAmount = req.body.taxAmount || item.taxAmount
    item.additionalCost = req.body.additionalCost || item.additionalCost
    item.dateOfPurchase = req.body.dateOfPurchase || item.dateOfPurchase

    const updatedItem = await item.save()

    res.json({
      message: 'Item Updated Successfully!',
    })
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

export {
  getAllItems,
  createItems,
  getItemByCategory,
  getItemById,
  deleteItem,
  updateItem,
}
