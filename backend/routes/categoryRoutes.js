import express from 'express'
const router = express.Router()

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categoryController.js'

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication.js'

router.route('/')
  .post(authenticateUser, authorizePermissions('admin'), createCategory)
  .get(getAllCategories)

router.route('/:id')
  .delete(authenticateUser, authorizePermissions('admin'), deleteCategory)
  .patch(authenticateUser, authorizePermissions('admin'), updateCategory)
  .get(authenticateUser, authorizePermissions('admin'), getCategoryById)

export default router
