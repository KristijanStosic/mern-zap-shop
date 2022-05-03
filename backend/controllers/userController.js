import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/index.js'

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password')//.populate('address')
  res.status(StatusCodes.OK).json({ users })
}

const getUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password')//.populate('address')
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  res.send(req.body)
}

const deleteUser = async (req, res) => {
  res.send('deleteUser')
}

const updateUserPassword = async (req, res) => {
  res.send('updateUserPassword')
}

export {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  showCurrentUser,
  updateUserPassword,
}
