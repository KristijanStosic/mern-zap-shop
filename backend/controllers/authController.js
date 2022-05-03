import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/index.js'
import { attachCookiesToResponse, createTokenUser } from '../utils/index.js'

const register = async (req, res) => {
  const { name, email, password, address } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  if (password.length < 8) {
    throw new BadRequestError('Password must be at least 8 characters long')
  }

  const emailAlreadyExists = await User.findOne({ email })

  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists')
  }

  // first registered user is an admin
  const isFirstUser = (await User.countDocuments({})) === 0
  const role = isFirstUser ? 'admin' : 'user'

  const user = await User.create({ name, email, password, role, address })

  const tokenUser = createTokenUser(user)

  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials or there is no user with such an email')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Incorrect password')
  }

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() /*+ 5 * 1000*/)
  })
  res.status(StatusCodes.OK).json({ msg: 'Logged out!'})
}

export { register, login, logout }
