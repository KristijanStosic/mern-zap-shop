import express from 'express'
const router = express.Router()

import {
  createPublisher,
  deletePublisher,
  getAllPublishers,
  getPublisherById,
  updatePublisher,
} from '../controllers/publisherController.js'

router.route('/').post(createPublisher).get(getAllPublishers)
router.route('/:id').delete(deletePublisher).patch(updatePublisher).get(getPublisherById)

export default router
