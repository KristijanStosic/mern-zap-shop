import express from 'express'
const router = express.Router()

import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
} from '../controllers/addressController.js'

import { authenticateUser, authorizePermissions } from '../middleware/authentication.js'

router.route('/').post(authenticateUser, createAddress).get(authenticateUser, authorizePermissions('admin'),  getAllAddresses)
router.route('/:id').get(authenticateUser, getAddressById).delete(authenticateUser, deleteAddress).patch(authenticateUser, updateAddress)

export default router
