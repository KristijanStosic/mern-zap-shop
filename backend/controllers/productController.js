import Product from '../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cloudinary from 'cloudinary'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import APIFeatures from '../utils/apiFeatures.js'
import { count } from 'console'

const createProduct = async (req, res) => {
  //req.body.user = req.user.userId

  if (!req.files) {
    throw new BadRequestError('No File Uploaded')
  }

  const productImage = req.files.image

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload image')
  }

  const maxSize = 1024 * 1024

  if (productImage.size > maxSize) {
    throw new BadRequestError('Please upload image smaller than 1MB')
  }
  // productImage ===  req.files.image
  const result = await cloudinary.v2.uploader.upload(
    productImage.tempFilePath,
    {
      use_filename: true,
      folder: 'zapshop',
    }
  )

  fs.unlinkSync(productImage.tempFilePath)

  const {
    name,
    description,
    price,
    countInStock,
    gameLength,
    minPlayers,
    maxPlayers,
    freeShipping,
    featured,
    sku,
    suggestedAge,
    languageOfPublication,
    languageDependence,
    originCountry,
    designer,
    category,
    publisher,
  } = req.body

  /*if (
    !name ||
    !description ||
    !price ||
    !countInStock ||
    !gameLength ||
    !minPlayers ||
    !maxPlayers ||
    !freeShipping ||
    !featured ||
    !sku ||
    !suggestedAge ||
    !languageOfPublication ||
    !languageDependence ||
    !originCountry ||
    !designer ||
    !category ||
    !publisher
  ) {
    throw new BadRequestError('Please provide all values')
  }*/

  const product = new Product({
    name: name,
    description: description,
    price: price,
    countInStock: countInStock,
    image: result.secure_url,
    cloudinary_id: result.public_id,
    gameLength: gameLength,
    minPlayers: minPlayers,
    maxPlayers: maxPlayers,
    featured: featured,
    freeShipping: freeShipping,
    sku: sku,
    suggestedAge: suggestedAge,
    languageOfPublication: languageOfPublication,
    languageDependence: languageDependence,
    originCountry: originCountry,
    designer: designer,
    category: category,
    publisher: publisher,
    user: req.user.userId,
  })

  await product.save()
  //const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: 'Success! Product created.' })
}

const getAllProducts = async (req, res) => {
  const pageSize = 4
  const productCount = await Product.countDocuments()

  const apiFeatures = new APIFeatures(
    Product.find().populate('category publisher'),
    req.query
  ).search().filter().pagination(pageSize)

  //const products = await Product.find({})//.populate('category publisher')
  const products = await apiFeatures.query

  res.status(StatusCodes.OK).json({ count: productCount, productsCount: products.length, products })
}

const getProductById = async (req, res) => {
  const { id: productId } = req.params

  const product = await Product.findOne({ _id: productId }).populate('reviews')

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }

  res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
  const { id: productId } = req.params

  const {
    name,
    description,
    price,
    countInStock,
    gameLength,
    minPlayers,
    maxPlayers,
    freeShipping,
    featured,
    sku,
    suggestedAge,
    languageOfPublication,
    languageDependence,
    originCountry,
    designer,
    category,
    publisher,
  } = req.body

  const product = await Product.findById({ _id: productId })

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }
  await cloudinary.v2.uploader.destroy(product.cloudinary_id)

  const result = await cloudinary.v2.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'zapshop',
    }
  )

  fs.unlinkSync(req.files.image.tempFilePath)

  const productData = {
    name: name || product.name,
    description: description || product.description,
    price: price || product.price,
    countInStock: countInStock || product.countInStock,
    image: result.secure_url || product.image,
    cloudinary_id: result.public_id || product.cloudinary_id,
    freeShipping: freeShipping || product.freeShipping,
    featured: featured || product.featured,
    gameLength: gameLength || product.gameLength,
    minPlayers: minPlayers || product.minPlayers,
    maxPlayers: maxPlayers || product.maxPlayers,
    sku: sku || product.sku,
    suggestedAge: suggestedAge || product.suggestedAge,
    languageOfPublication:
      languageOfPublication || product.languageOfPublication,
    languageDependence: languageDependence || product.languageDependence,
    originCountry: originCountry || product.originCountry,
    designer: designer || product.designer,
    category: category || product.category,
    publisher: publisher || product.publisher,
    user: req.user.userId || product.user,
  }

  await Product.findByIdAndUpdate(productId, productData, {
    new: true,
    runValidators: true,
  })
  await product.save()

  res.status(StatusCodes.OK).json({ msg: 'Success! Product updated.' })
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params

  const product = await Product.findOne({ _id: productId })

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }
  await cloudinary.v2.uploader.destroy(product.cloudinary_id)
  await product.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' })
}

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No File Uploaded')
  }

  const productImage = req.files.image

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload image')
  }

  const maxSize = 1024 * 1024

  if (productImage.size > maxSize) {
    throw new BadRequestError('Please upload image smaller than 1MB')
  }

  const imagePath = path.join(
    __dirname,
    '../../uploads/' + `${productImage.name}`
  )
  await productImage.mv(imagePath)

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

const uploadImageToCloud = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No File Uploaded')
  }

  const productImage = req.files.image

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload image')
  }

  const maxSize = 1024 * 1024

  if (productImage.size > maxSize) {
    throw new BadRequestError('Please upload image smaller than 1MB')
  }
  // productImage ===  req.files.image
  const result = await cloudinary.v2.uploader.upload(
    productImage.tempFilePath,
    {
      use_filename: true,
      folder: 'zapshop',
    }
  )

  fs.unlinkSync(productImage.tempFilePath)

  return res
    .status(StatusCodes.OK)
    .json({ image: { public_id: result.public_id, url: result.secure_url } })
}

const productCount = async (req, res) => {
  const countProducts = await Product.countDocuments((count) => count).clone()

  res.status(StatusCodes.OK).json({ productCount: countProducts })
}

const featuredProducts = async (req, res) => {
  const count = req.params.count ? req.params.count : 0
  const featuredProducts = await Product.find({ featured: true }).limit(count)

  res.status(StatusCodes.OK).json({ featuredProducts: featuredProducts })
}

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadImage,
  uploadImageToCloud,
  productCount,
  featuredProducts,
}

/*const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};*/
