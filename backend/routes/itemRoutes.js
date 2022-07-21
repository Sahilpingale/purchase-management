import express from 'express'
import { getAllItems, createItems } from '../controllers/itemController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getAllItems)
router.post('/', protect, createItems)

export default router
