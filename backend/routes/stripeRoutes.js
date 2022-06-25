import express from 'express'
const router = express.Router()

import { createCheckoutSession, webhook } from '../controllers/stripeController.js'

router.route('/create-checkout-session').post(createCheckoutSession)
router.route('/webhook', express.json({ type: 'application/json' })).post(webhook)

export default router
