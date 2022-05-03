import Address from '../models/Address.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const createAddress = async (req, res) => {
  const { street, city, country } = req.body

  if (!street || !city || !country) {
    throw new BadRequestError('Please provide all values')
  }
  const address = await Address.create(req.body)
  res.status(StatusCodes.CREATED).json({ address })
}

const getAllAddresses = async (req, res) => {
  const addresses = await Address.find({})
  res.status(StatusCodes.OK).json({ addresses })
}

const getAddressById = async (req, res) => {
  const { id: addressId } = req.params

  const address = await Address.findOne({ _id: addressId })

  if (!address) {
    throw new NotFoundError(`No address with id: ${addressId}`)
  }
  res.status(StatusCodes.OK).json({ address })
}

const updateAddress = async (req, res) => {
  const { id: addressId } = req.params 

  const address = await Address.findOneAndUpdate({ _id: addressId }, req.body, {
    new: true,
    runValidators: true
  })

  if (!address) {
    throw new NotFoundError(`No address with id: ${addressId}`)
  }

  res.status(StatusCodes.OK).json({ address })
}

const deleteAddress = async (req, res) => {
  const { id: addressId } = req.params

  const address = await Address.findOne({ _id: addressId })
  if (!address) {
    throw new NotFoundError(`No address with id: ${addressId}`)
  }

  await address.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Address removed.' })
}

export {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
}
