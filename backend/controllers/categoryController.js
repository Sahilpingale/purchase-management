import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Get all categories
// @route   GET /api/category
// @access  Private
const getAllCategories = asyncHandler(async (req, res) => {
  const Categories = await Category.find({}).sort({ name: 1 })
  res.json(Categories)
})

// @desc    Create Category
// @route   POST /api/category
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  const checkCategoryExist = await Category.findOne({ name })

  if (checkCategoryExist) {
    // res.json(checkCategoryExist)
    res.status(400)
    throw new Error('Category already exists')
  }

  const category = await Category.create({
    name,
  })

  if (category) {
    res.status(201).json({
      _id: category._id,
      name: category.name,
    })
  } else {
    res.status(400)
    throw new Error('Invalid Category data')
  }
})

export { getAllCategories, createCategory }
