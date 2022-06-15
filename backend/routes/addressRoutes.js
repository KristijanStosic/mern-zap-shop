import express from 'express'
const router = express.Router()

import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  getUserAddress,
} from '../controllers/addressController.js'

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication.js'

router
  .route('/')
  .post(authenticateUser, createAddress)
  .get(authenticateUser, authorizePermissions('admin'), getAllAddresses)

router.route('/my-address').get(authenticateUser, getUserAddress)

router
  .route('/:id')
  .get(authenticateUser, getAddressById)
  .delete(authenticateUser, deleteAddress)
  .patch(authenticateUser, updateAddress)

export default router
