import express from 'express'
const router = express.Router()

import { getStripeApiKey, createCheckoutSession } from '../controllers/stripeController.js'
import { authenticateUser } from '../middleware/authentication.js'

router.route('/create-checkout-session').post(createCheckoutSession)
router.route('/stripe-api-key').get(authenticateUser, getStripeApiKey)

export default router
