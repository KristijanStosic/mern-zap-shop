import Publisher from '../models/Publisher.js'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'

const createPublisher = async (req, res) => {
  const { name } = req.body

  if (!name) {
    throw new BadRequestError('Please provide publisher name')
  }

  const publisherAlreadyExists = await Publisher.findOne({ name })

  if (publisherAlreadyExists) {
    throw new BadRequestError('Publisher already exists. Insert new value')
  }

  const publisher = await Publisher.create({ name })
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Success! Publisher created', publisher })
}

const getAllPublishers = async (req, res) => {
  const publishers = await Publisher.find({})
  res.status(StatusCodes.OK).json({ publishers })
}

const getPublisherById = async (req, res) => {
  const { id: publisherId } = req.params

  const publisher = await Publisher.findOne({ _id: publisherId })

  if (!publisher) {
    throw new NotFoundError(`No publisher with id: ${publisherId}`)
  }
  res.status(StatusCodes.OK).json({ publisher })
}

const updatePublisher = async (req, res) => {
  const { id: publisherId } = req.params
  const { name } = req.body

  if (!name) {
    throw new BadRequestError('Please provide publisher name')
  }

  const publisher = await Publisher.findOne({ _id: publisherId })

  if (!publisher) {
    throw new NotFoundError(`No publisher with id: ${publisherId}`)
  }

  const publisherAlreadyExists = await Publisher.findOne({ name })

  if (publisherAlreadyExists) {
    throw new BadRequestError('Publisher already exists. Insert new value')
  }

  publisher.name = name
  await publisher.save()

  res.status(StatusCodes.OK).json({ msg: 'Success! Publisher updated.' })
}

const deletePublisher = async (req, res) => {
  const { id: publisherId } = req.params

  const publisher = await Publisher.findOne({ _id: publisherId })
  if (!publisher) {
    throw new NotFoundError(`No publisher with id: ${publisherId}`)
  }

  await publisher.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Publisher removed.' })
}

export {
  createPublisher,
  deletePublisher,
  getAllPublishers,
  getPublisherById,
  updatePublisher,
}
