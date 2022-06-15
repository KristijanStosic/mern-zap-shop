import Address from '../models/Address.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import { checkPermissions } from '../utils/index.js'

const createAddress = async (req, res) => {
  const { street, city, country } = req.body

  if (!street || !city || !country) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.user = req.user.userId
  const address = await Address.create(req.body)
  res.status(StatusCodes.CREATED).json(address)
}

const getAllAddresses = async (req, res) => {
  const addresses = await Address.find({}).populate('user', 'name email')
  res.status(StatusCodes.OK).json(addresses)
}

const getAddressById = async (req, res) => {
  const { id: addressId } = req.params

  const address = await Address.findOne({ _id: addressId }).populate('user', '-password -verificationToken -isVerified')

  if (!address) {
    throw new NotFoundError(`No address with id: ${addressId}`)
  }

  res.status(StatusCodes.OK).json(address)
}

const getUserAddress = async (req, res) => {
  const address = await Address.findOne({ user: req.user.userId })

  if(!address) {
    throw new NotFoundError('Address not found')
  }

  res.status(StatusCodes.OK).json(address)
}

const updateAddress = async (req, res) => {
  const { id: addressId } = req.params
  const { street, city, postalCode, country } = req.body

  const address = await Address.findOne({ _id: addressId })

  if (!address) {
    throw new NotFoundError(`No address with id: ${addressId}`)
  }
  checkPermissions(req.user, address.user)

  address.street = street
  address.city = city
  address.postalCode = postalCode
  address.country = country

  await address.save()

  res.status(StatusCodes.OK).json({ msg: 'Success! Address updated.' })
}

const deleteAddress = async (req, res) => {
  const { id: addressId } = req.params

  const address = await Address.findOne({ _id: addressId })
  if (!address) {
    throw new NotFoundError(`No address with id: ${addressId}`)
  }
  checkPermissions(req.user, address.user)
  
  await address.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Address removed.' })
}
export {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  getUserAddress,
}
