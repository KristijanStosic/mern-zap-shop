import User from '../models/User.js'
import Token from '../models/Token.js'
import { StatusCodes } from 'http-status-codes'
import crypto from 'crypto'

import {
  BadRequestError,
  UnauthenticatedError,
  ConflictError,
} from '../errors/index.js'
import {
  createJWT,
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} from '../utils/index.js'

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  if (password.length < 8) {
    throw new BadRequestError('Password must be at least 8 characters long')
  }

  const emailAlreadyExists = await User.findOne({ email })

  if (emailAlreadyExists) {
    throw new ConflictError('Email already exists')
  }

  // first registered user is an admin
  const isFirstUser = (await User.countDocuments({})) === 0
  const role = isFirstUser ? 'admin' : 'user'

  const user = await User.create({ name, email, password, role })
  const tokenUser = createTokenUser(user)

  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError(
      'Invalid credentials or there is no user with such an email'
    )
  }
  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Incorrect password')
  }

  /*if(!user.isVerified) {
    throw new UnauthenticatedError('Please verify your email')
  }*/

  const tokenUser = createTokenUser(user)
  const token = createJWT({ payload: tokenUser })
  res
    .status(StatusCodes.OK)
    .json({
      user: { name: user.name, email: user.email, role: user.role },
      token,
    })
}


const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Verification failed')
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError('Verification failed or token expired')
  }

  user.isVerified = true
  user.verified = Date.now()
  user.verificationToken = ''

  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'Email verified' })
}

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId })

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'Logged out!' })
}

const forgotPassword = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequestError('Please provide email')
  }

  const user = await User.findOne({ email })

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex')
    const origin = 'http://localhost:3000'
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    })

    const tenMinutes = 1000 * 60 * 10
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)

    user.passwordToken = createHash(passwordToken)
    user.passwordTokenExpirationDate = passwordTokenExpirationDate
    await user.save()
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for reset password link' })
}

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body

  if(password.length < 8) {
    throw new BadRequestError('Password must be at least 8 characters long')
  }

  if (!token || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ email })

  if (user) {
    const currentDate = new Date()

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password
      user.passwordToken = undefined
      user.passwordTokenExpirationDate = undefined
      await user.save()
    }
  } else {
    throw new UnauthenticatedError('Password reset failed')
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Success! New password set successfully' })
}


/*const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  if (password.length < 8) {
    throw new BadRequestError('Password must be at least 8 characters long')
  }

  const emailAlreadyExists = await User.findOne({ email })

  if (emailAlreadyExists) {
    throw new ConflictError('Email already exists')
  }

  // first registered user is an admin
  const isFirstUser = (await User.countDocuments({})) === 0
  const role = isFirstUser ? 'admin' : 'user'

  const verificationToken = crypto.randomBytes(40).toString('hex')

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  })

  const origin = 'http://localhost:3000'

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  })

  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
    //verificationToken: user.verificationToken
  })

  //const tokenUser = createTokenUser(user)
  //({ res, user: tokenUser })
  //res.status(StatusCodes.CREATED).json({ user: tokenUser })
}*/


/*const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError(
      'Invalid credentials or there is no user with such an email'
    )
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Incorrect password')
  }

  if (!user.isVerified) {
    throw new UnauthenticatedError('Please verify your email')
  }

  const tokenUser = createTokenUser(user)

  // create refresh token
  let refreshToken = ''
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id })

  if (existingToken) {
    const { isValid } = existingToken
    if (!isValid) {
      throw new UnauthenticatedError('Invalid credentials')
      // if user maybe starts to do something unwanted in our app we can easily set isValid to false so he or she does not have access anymore
    }
    refreshToken = existingToken.refreshToken
    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser })
    return
  }

  refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }
  await Token.create(userToken)

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}*/


export { register, login, logout, verifyEmail, forgotPassword, resetPassword }
