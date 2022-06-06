import Product from '../models/Product.js'
import Category from '../models/Category.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cloudinary from 'cloudinary'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import APIFeatures from '../utils/apiFeatures.js'

const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    countInStock,
    image,
    gameLength,
    minPlayers,
    maxPlayers,
    featured,
    freeShipping,
    sku,
    suggestedAge,
    languageOfPublication,
    languageDependence,
    originCountry,
    designer,
    category,
    publisher,
  } = req.body

  if(!name || !description || !price || !countInStock || !image || !gameLength || !minPlayers || !maxPlayers || !featured || !freeShipping || !sku || !suggestedAge || !languageOfPublication || !languageDependence || !originCountry || !designer) {
    throw new BadRequestError('Please provide all values')
  }

  if (image) {
    const uploadedResponse = await cloudinary.v2.uploader.upload(image, {
      upload_preset: "online-shop",
    });

    if (uploadedResponse) {
      const product = new Product({
        image: uploadedResponse,
        name, 
        description, 
        price, 
        countInStock, 
        gameLength, 
        minPlayers, 
        maxPlayers, 
        featured, 
        freeShipping, 
        sku, 
        suggestedAge, 
        languageOfPublication,
        languageDependence,
        originCountry,
        designer,
        category,
        publisher,
        user: req.user.userId,
      });

      const createdProduct = await product.save()
  
      //const product = await Product.create(req.body)
      res.status(StatusCodes.CREATED).json(createdProduct)
    }
  } else {
    throw new BadRequestError('Please provide image')
  }
}

const getAllProducts = async (req, res) => {
  const pageSize = 8
  const productCount = await Product.countDocuments()

  const apiFeatures = new APIFeatures(
    Product.find().populate('category publisher'),
    req.query
  ).search().filter().pagination(pageSize).sort()

  const products = await apiFeatures.query
  res.status(StatusCodes.OK).json({ count: productCount, productsCount: products.length, products })
}

const getProductById = async (req, res) => {
  const { id: productId } = req.params
  
  const product = await Product.findOne({ _id: productId }).populate('category', 'name').populate('publisher', 'name')

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }
  res.status(StatusCodes.OK).json(product)
}

const updateProduct = async (req, res) => {
  const { id: productId } = req.params

  const {
    name,
    description,
    price,
    countInStock,
    image,
    gameLength,
    minPlayers,
    maxPlayers,
    featured,
    freeShipping,
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

  await cloudinary.v2.uploader.destroy(product.image.public_id)

  if (image) {
    const uploadedResponse = await cloudinary.v2.uploader.upload(image, {
      upload_preset: "online-shop",
    });

    if (uploadedResponse) {
      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        countInStock: countInStock || product.countInStock,
        image: uploadedResponse || product.image.url,
        featured: featured || product.featured,
        freeShipping: freeShipping || product.freeShipping,
        gameLength: gameLength || product.gameLength,
        minPlayers: minPlayers || product.minPlayers,
        maxPlayers: maxPlayers || product.maxPlayers,
        sku: sku || product.sku,
        suggestedAge: suggestedAge || product.suggestedAge,
        languageOfPublication: languageOfPublication || product.languageOfPublication,
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

      const updatedProduct = await product.save()
      res.status(StatusCodes.OK).json(updatedProduct)
    }
  }
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params

  const product = await Product.findOne({ _id: productId })

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }
  await cloudinary.v2.uploader.destroy(product.image.public_id)
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

  return res.send( `/uploads/${productImage.name}`)
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
    .json({ public_id: result.public_id, url: result.secure_url })
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

const getProductsByCategory = async(req, res) => {
  const { id: categoryId } = req.params
  const products = await Product.find({ category: categoryId })
  res.status(StatusCodes.OK).json(products)
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
  getProductsByCategory
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
