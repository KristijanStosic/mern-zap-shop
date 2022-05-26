import express from 'express'
const router = express.Router()

import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from '../controllers/reviewController.js'

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication.js'

router
  .route('/')
  .post(authenticateUser, createReview)
  .get(getAllReviews)
router.route('/:id').get(getReviewById).patch(authenticateUser, updateReview).delete(authenticateUser, authorizePermissions('admin'), deleteReview)


export default router
