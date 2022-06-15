import express from 'express'
const router = express.Router()

import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUser,
  getUserProfile,
  updateUserPassword,
  updateUserById,
} from '../controllers/userController.js'

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication.js'

router.route('/')
  .get(authenticateUser, authorizePermissions('admin'), getAllUsers)

router.route('/profile')
  .get(authenticateUser, getUserProfile)
  .patch(authenticateUser, updateUserProfile)

router.route('/updateUserPassword')
  .patch(authenticateUser, updateUserPassword)

router.route('/:id')
  .get(authenticateUser, getUserById)
  .patch(authenticateUser, authorizePermissions('admin'), updateUserById)
  .delete(authenticateUser, authorizePermissions('admin'), deleteUser)

export default router
