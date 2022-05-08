import express from 'express'
const router = express.Router()

import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
} from '../controllers/addressController.js'

import { authenticateUser } from '../middleware/authentication.js'

router.route('/').post(authenticateUser, createAddress).get(authenticateUser, getAllAddresses)
router.route('/:id').delete(authenticateUser, deleteAddress).patch(authenticateUser, updateAddress).get(getAddressById)

export default router
