import express from 'express'
const router = express.Router()

import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
} from '../controllers/addressController.js'

router.route('/').post(createAddress).get(getAllAddresses)
router.route('/:id').delete(deleteAddress).patch(updateAddress).get(getAddressById)

export default router
