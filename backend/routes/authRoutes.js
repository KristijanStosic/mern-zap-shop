import express from 'express'
const router = express.Router()

import { register, login, logout, verifyEmail } from '../controllers/authController.js'

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/verify-email', verifyEmail)


export default router
