import express from 'express'
const router = express.Router()

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  showCurrentUser,
  updateUserPassword,
} from '../controllers/userController.js'

import { authenticateUser, authorizePermissions } from '../middleware/authentication.js'

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers)
router.route('/profile').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)
router.route('/:id').get(authenticateUser, getUserById).delete(authenticateUser, authorizePermissions('admin'), deleteUser)

export default router
