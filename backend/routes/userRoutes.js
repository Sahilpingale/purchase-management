import express from 'express'
import {
  authUser,
  getAllUsers,
  registerUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// router.route('/').get(getAllUsers)
// router.get('/', getAllUsers)
router.post('/', registerUser)
router.post('/login', authUser)

export default router
