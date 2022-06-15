import Product from '../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cloudinary from 'cloudinary'
import APIFeatures from '../utils/apiFeatures.js'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
  
      res.status(StatusCodes.CREATED).json(createdProduct)
    }
  } else {
    throw new BadRequestError('Please choose image')
  }
}

const getAllProducts = async (req, res) => {
  const pageSize = 6
  const productsCount = await Product.countDocuments()

  const apiFeatures = new APIFeatures(
    Product.find().populate('category publisher'),
    req.query
  ).search().filter().pagination(pageSize).sort()

  const products = await apiFeatures.query
  res.status(StatusCodes.OK).json({ productsCount: productsCount, productsPerPage: products.length, products })
}

const getAllProductsByAdmin = async (req, res) => {
  const products = await Product.find({}).populate('category', 'name').populate('publisher', 'name')
  res.status(StatusCodes.OK).json(products)
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

  const product = await Product.findById({ _id: productId })

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }

  if(req.body.image) {
    const destroyResponse = await cloudinary.v2.uploader.destroy(product.image.public_id)

    if (destroyResponse) {
      const uploadedResponse = await cloudinary.v2.uploader.upload(req.body.image, {
        upload_preset: "online-shop",
        }
      );

      if(uploadedResponse) {
        const updatedProduct = await Product.findByIdAndUpdate(productId, 
          {
            $set: {
              ... req.body.product,
              image: uploadedResponse
            }
          },
          {
            new: true
          })
          res.status(StatusCodes.OK).json(updatedProduct)
      }
    }
  } else {
    
  /*const productData = {
    name: req.body.name || product.name,
    price: req.body.price || product.price,
    description: req.body.description || product.description,
    countInStock: req.body.countInStock || product.countInStock,
    featured: req.body.featured || product.featured,
    freeShipping: req.body.freeShipping || product.freeShipping,
    gameLength: req.body.gameLength || product.gameLength,
    minPlayers: req.body.minPlayers || product.minPlayers,
    maxPlayers: req.body.maxPlayers || product.maxPlayers,
    sku: req.body.sku || product.sku,
    suggestedAge: req.body.suggestedAge || product.suggestedAge,
    languageOfPublication: req.body.languageOfPublication || product.languageOfPublication,
    languageDependence: req.body.languageDependence || product.languageDependence,
    originCountry: req.body.originCountry || product.originCountry,
    designer: req.body.designer || product.designer,
    category: req.body.category || product.category,
    publisher: req.body.publisher || product.publisher,
    user: req.user.userId,
  }*/
    product.user = req.user.userId
    const updatedProduct = await Product.findByIdAndUpdate(productId, 
      {
        $set: req.body.product
      },
      {
        new: true
      })
    res.status(StatusCodes.OK).json(updatedProduct)
  }
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params

  const product = await Product.findOne({ _id: productId })

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }

  if(product.image.public_id) {
    await cloudinary.v2.uploader.destroy(product.image.public_id)
  }

  await product.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' })
}

const productCount = async (req, res) => {
  const countProducts = await Product.countDocuments((count) => count).clone()

  res.status(StatusCodes.OK).json({ productCount: countProducts })
}

const featuredProducts = async (req, res) => {
  const count = req.params.count ? req.params.count : 0
  const featuredProducts = await Product.find({ featured: true }).limit(count)

  res.status(StatusCodes.OK).json(featuredProducts)
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

  return res.status(StatusCodes.OK).json({ public_id: result.public_id, url: result.secure_url })
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
  getAllProductsByAdmin
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
