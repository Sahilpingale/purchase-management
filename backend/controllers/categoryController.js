import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Get all categories
// @route   GET /api/category
// @access  Private

const getAllCategories = asyncHandler(async (req, res) => {
  const Categories = await Category.find({})
  res.json(Categories)
})

export { getAllCategories }
