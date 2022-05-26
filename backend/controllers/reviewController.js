import Review from '../models/Review.js'
import Product from '../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError, BadRequestError } from '../errors/index.js'
import { checkPermissions } from '../utils/index.js'

const createReview = async (req, res) => {
  const { product: productId } = req.body

  const isValidProduct = await Product.findOne({ _id: productId })

  if (!isValidProduct) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  })

  if (alreadySubmitted) {
    throw new BadRequestError('Already submitted review for this product.')
  }

  req.body.user = req.user.userId
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
}

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'product',
    select: 'name designer price',
  })

  res.status(StatusCodes.OK).json({ count: reviews.length, reviews })
}

const getReviewById = async (req, res) => {
  const { id: reviewId } = req.params

  const review = await Review.findOne({ _id: reviewId })

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`)
  }

  res.status(StatusCodes.OK).json({ review })
}

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params
  const { rating, title, comment } = req.body

  const review = await Review.findOne({ _id: reviewId })

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`)
  }

  checkPermissions(req.user, review.user)

  review.rating = rating
  review.title = title
  review.comment = comment

  await review.save()
  res.status(StatusCodes.OK).json({ msg: 'Success! Review updated.' })
}

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params

  const review = await Review.findOne({ _id: reviewId })

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`)
  }

  // not able to delete other users reviews except admins
  checkPermissions(req.user, review.user)

  await review.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' })
}

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params
  const reviews = await Review.find({ product: productId })
  res.status(StatusCodes.OK).json({ count: reviews.length, reviews })
}

export {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
  getSingleProductReviews 
}
