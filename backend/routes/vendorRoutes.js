import express from 'express'
import {
  createVendor,
  getAllVendors,
  getVendorByCategory,
  getVendorById,
  updateVendor,
} from '../controllers/vendorController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// router.route('/').get(getAllUsers)
router.get('/', protect, getAllVendors)
router.get('/:id', protect, getVendorById)
router.put('/:id', protect, updateVendor)
router.post('/', protect, createVendor)
router.post('/category', protect, getVendorByCategory)

export default router
