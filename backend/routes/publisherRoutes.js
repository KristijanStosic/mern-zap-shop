import express from 'express'
const router = express.Router()

import {
  createPublisher,
  deletePublisher,
  getAllPublishers,
  getPublisherById,
  updatePublisher,
} from '../controllers/publisherController.js'

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication.js'

router.route('/')
  .post(authenticateUser, authorizePermissions('admin'), createPublisher)
  .get(getAllPublishers)

router.route('/:id')
  .delete(authenticateUser, authorizePermissions('admin'), deletePublisher)
  .patch(authenticateUser, authorizePermissions('admin'), updatePublisher)
  .get(authenticateUser, authorizePermissions('admin'), getPublisherById)

export default router
