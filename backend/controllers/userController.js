import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} from '../errors/index.js'
import { createTokenUser, attachCookiesToResponse, checkPermissions } from '../utils/index.js'

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password') //.populate('address')
  res.status(StatusCodes.OK).json({ users })
}

const getUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password').populate('address')
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`)
  }
  checkPermissions(req.user, user._id)
  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

// update user with user.save()
const updateUser = async (req, res) => {
  const { email, name, address } = req.body;
  if (!email || !name) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.address = address;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide both values')
  }

  const user = await User.findOne({ _id: req.user.userId })

  if (!user) {
    throw new NotFoundError('User does not exist')
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Incorrect password')
  }

  user.password = newPassword

  await user.save()
  res.status(StatusCodes.OK).json({ msg: 'Success! Password updated.' })
}

const deleteUser = async (req, res) => {
  const { id: userId } = req.params

  const user = await User.findOne({ _id: userId })
  if (!user) {
    throw new NotFoundError(`No user with id: ${userId}`)
  }

  await user.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! User removed.' })
}

export {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  showCurrentUser,
  updateUserPassword,
}


// updateUser with findOneAndUpdate
/*const updateUser = async (req, res) => {
  const { name, email, address } = req.body

  if (!name || !email) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name, address },
    { new: true, runValidators: true }
  )

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}*/