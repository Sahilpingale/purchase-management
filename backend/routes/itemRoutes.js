import express from 'express'
import { getAllItems } from '../controllers/itemController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// router.get('/', protect, getAllVendors)
router.get('/', protect, getAllItems)

export default router
