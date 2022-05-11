import express from 'express'
const router = express.Router()

import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  getCurrentUserOrders,
} from '../controllers/orderController.js'

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication.js'
router
  .route('/')
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions('admin'), getAllOrders)

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders)

router
  .route('/:id')
  .get(authenticateUser, getOrderById)
  .patch(authenticateUser, updateOrder)
  .delete(authenticateUser, authorizePermissions('admin'), deleteOrder)

export default router
