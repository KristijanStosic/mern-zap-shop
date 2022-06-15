import express from 'express'
const router = express.Router()

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadImage,
  uploadImageToCloud,
  productCount,
  featuredProducts,
  getAllProductsByAdmin,
} from '../controllers/productController.js'

import { getSingleProductReviews } from '../controllers/reviewController.js'

import { authenticateUser, authorizePermissions } from '../middleware/authentication.js'

router.route('/')
  .post([authenticateUser, authorizePermissions('admin')], createProduct)
  .get(getAllProducts);

router.route('/admin')
  .get(authenticateUser, authorizePermissions('admin'), getAllProductsByAdmin)


router.route('/upload-image').post(uploadImageToCloud)

router.get('/count', productCount)
router.get('/featured/:count', featuredProducts)

router.route('/:id')
  .get(getProductById)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)

router.route('/:id/reviews').get(getSingleProductReviews)

export default router
