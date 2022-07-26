import express from 'express'
import {
  authUser,
  getAllUsers,
  registerUser,
  updateUser,
  getUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.put('/update', protect, updateUser)
router.post('/', registerUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)

export default router
