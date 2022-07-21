import express from 'express'
import {
  createCategory,
  getAllCategories,
} from '../controllers/categoryController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// router.route('/').get(getAllUsers)
// router.get('/', getAllUsers)
router.get('/', protect, getAllCategories)
router.post('/', protect, createCategory)

export default router
