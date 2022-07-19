import express from 'express'
import { getAllVendors } from '../controllers/vendorController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// router.route('/').get(getAllUsers)
router.get('/', protect, getAllVendors)

export default router
