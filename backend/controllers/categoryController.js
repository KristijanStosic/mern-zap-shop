import Category from '../models/Category.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError, BadRequestError } from '../errors/index.js'

const createCategory = async (req, res) => {
  const { name } = req.body 

  if(!name) {
    throw new BadRequestError('Please provide category name')
  }

  const categoryAlreadyExists = await Category.findOne({ name })

  if (categoryAlreadyExists) {
    throw new BadRequestError('Category already exists. Insert new value')
  }

  const category = await Category.create({ name })
  res.status(StatusCodes.CREATED).json({ category })
}

const getAllCategories = async (req, res) => {
  const categories = await Category.find({})
  res.status(StatusCodes.OK).json({ categories })
}

const getCategoryById = async (req, res) => {
  const { id: categoryId } = req.params

  const category = await Category.findOne({ _id: categoryId })

  if (!category) {
    throw new NotFoundError(`No category with id: ${categoryId}`)
  }
  res.status(StatusCodes.OK).json({ category })
}

const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params 

  const category = await Category.findOneAndUpdate({ _id: categoryId }, req.body, {
    new: true,
    runValidators: true
  })

  if (!category) {
    throw new NotFoundError(`No category with id: ${categoryId}`)
  }

  res.status(StatusCodes.OK).json({ category })
}

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params

  const category = await Category.findOne({ _id: categoryId })
  if (!category) {
    throw new NotFoundError(`No category with id: ${categoryId}`)
  }

  await category.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Category removed.' })
}

export {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
}
