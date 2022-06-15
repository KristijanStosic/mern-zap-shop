import Category from '../models/Category.js'
import Product from '../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError, BadRequestError, ConflictError } from '../errors/index.js'

const createCategory = async (req, res) => {
  const { name } = req.body

  if (!name) {
    throw new BadRequestError('Please provide category name')
  }

  const categoryAlreadyExists = await Category.findOne({ name })

  if (categoryAlreadyExists) {
    throw new ConflictError('Category already exists. Insert new value')
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

  res.status(StatusCodes.OK).json(category)
}

const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params
  const { name } = req.body

  if (!name) {
    throw new BadRequestError('Please provide category name')
  }

  const category = await Category.findOne({ _id: categoryId })

  if (!category) {
    throw new NotFoundError(`No category with id: ${categoryId}`)
  }

  const categoryAlreadyExists = await Category.findOne({ name })

  if (categoryAlreadyExists) {
    throw new BadRequestError('Category already exists. Insert new value')
  }

  category.name = name
  await category.save()

  res.status(StatusCodes.OK).json({ msg: 'Success! Category updated.' })
}

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params

  const product = await Product.findOne({ category: categoryId })
  if(product) {
    throw new BadRequestError('Please delete all products related with this category')
  }

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
