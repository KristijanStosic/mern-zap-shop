import express from 'express'
const router = express.Router()

import { getStripeApiKey, createCheckoutSession, createPayment, webhook} from '../controllers/stripeController.js'
import { authenticateUser } from '../middleware/authentication.js'

router.route('/create-checkout-session').post(createCheckoutSession)
router.route('/stripe-api-key').get(authenticateUser, getStripeApiKey)
router.route('/create-payment').post(createPayment)
router.route('/webhook', express.json({ type: "application/json" })).post(webhook)

export default router
