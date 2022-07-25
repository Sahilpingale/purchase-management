import Item from '../models/itemModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Private

const getAllItems = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        vendorName: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  // const items = await Item.find({ ...keyword }).sort({ _id: -1 })
  const items = await Item.find({
    $or: [
      { vendorName: { $regex: `${req.query.keyword}`, $options: 'i' } },
      { clientName: { $regex: `${req.query.keyword}`, $options: 'i' } },
    ],
  }).sort({ _id: -1 })
  res.send(items)
})

// @desc    Create Item
// @route   POST /api/items
// @access  Private

const createItems = asyncHandler(async (req, res) => {
  const {
    name,
    vendorName,
    clientName,
    taxAmount,
    rate,
    unitOfMeasurement,
    total,
    dateOfPurchase,
  } = req.body

  const item = await Item.create({
    name,
    vendorName,
    clientName,
    rate,
    taxAmount,
    unitOfMeasurement,
    total,
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
    item.vendorName = req.body.vendorName || item.vendorName
    item.clientName = req.body.clientName || item.clientName
    item.rate = req.body.rate || item.rate
    item.taxAmount = req.body.taxAmount || item.taxAmount
    item.unitOfMeasurement =
      req.body.unitOfMeasurement || item.unitOfMeasurement
    item.total = req.body.total || item.total
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
