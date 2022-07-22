import express from 'express'
import {
  getAllItems,
  createItems,
  getItemByCategory,
} from '../controllers/itemController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getAllItems)
router.post('/category', protect, getItemByCategory)
router.post('/', protect, createItems)

export default router
