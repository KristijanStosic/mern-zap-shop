import express from 'express'
const router = express.Router()

import { getStripeApiKey, createCheckoutSession, createPayment } from '../controllers/stripeController.js'
import { authenticateUser } from '../middleware/authentication.js'

router.route('/create-checkout-session').post(createCheckoutSession)
router.route('/stripe-api-key').get(authenticateUser, getStripeApiKey)
router.route('/create-payment').post(createPayment)

export default router
