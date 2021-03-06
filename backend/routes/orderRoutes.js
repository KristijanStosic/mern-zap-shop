import express from 'express'
const router = express.Router()

import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderToDelivered,
  getMyOrders,
  updateOrderToPaid,
} from '../controllers/orderController.js'

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication.js'

router.route('/')
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions('admin'), getAllOrders)

router.route('/my-orders').get(authenticateUser, getMyOrders)
router.route('/:id/pay').patch(authenticateUser, updateOrderToPaid)

router.route('/:id/deliver')
  .patch(authenticateUser, authorizePermissions('admin'), updateOrderToDelivered)

router.route('/:id')
  .get(authenticateUser, getOrderById)
  .delete(authenticateUser, authorizePermissions('admin'), deleteOrder)

export default router
