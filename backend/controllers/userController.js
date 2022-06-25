import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError, BadRequestError, UnauthenticatedError } from '../errors/index.js'
import { createTokenUser, checkPermissions, createJWT } from '../utils/index.js'

const getAllUsers = async (req, res) => {
  const users = await User.find({ }).select('-password')
  res.status(StatusCodes.OK).json(users)
}

const getUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password')

  if (!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`)
  }

  checkPermissions(req.user, user._id)

  res.status(StatusCodes.OK).json(user)
}

const getUserProfile = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select('-password')

  if(!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`)
  }

  res.status(StatusCodes.OK).json(user)
}

// update user with user.save()
const updateUserProfile = async (req, res) => {
  const { email, name } = req.body;
  
  if (!email || !name) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();

  const tokenUser = createTokenUser(user);
  const token = createJWT({ payload: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const updateUserById = async (req, res) => {
  const { id: userId } = req.params

  const { name, email, role } = req.body
  
  if (!name || !email || !role) {
    throw new BadRequestError('Please provide all values')
  }
  
  const user = await User.findOne({ _id: userId }).select('-password')
  
  if (!user) {
    throw new NotFoundError(`No user with id: ${userId}`)
  }

  user.name = name
  user.email = email
  user.role = role

  await user.save()
  
  res.status(StatusCodes.OK).json({ msg: 'Success! User updated.', user })
}

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ _id: req.user.userId })

  if (!user) {
    throw new NotFoundError('User does not exist')
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Old password is incorrect')
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
  updateUserProfile,
  deleteUser,
  getUserProfile,
  updateUserPassword,
  updateUserById
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