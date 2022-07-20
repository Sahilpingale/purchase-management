import express from 'express'
import {
  getAllVendors,
  getVendorByCategory,
} from '../controllers/vendorController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// router.route('/').get(getAllUsers)
router.get('/', protect, getAllVendors)
router.post('/category', protect, getVendorByCategory)

export default router
