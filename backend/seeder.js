import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './data/products.js'
import users from './data/users.js'
import categories from './data/categories.js'
import publishers from './data/publishers.js'
import addresses from './data/addresses.js'
import orders from './data/orders.js'

import Product from './models/Product.js'
import User from './models/User.js'
import Category from './models/Category.js'
import Publisher from './models/Publisher.js'
import Address from './models/Address.js'
import Review from './models/Review.js'
import Order from './models/Order.js'


import connectDB from './db/connect.js'

dotenv.config()

connectDB(process.env.MONGO_URL)

const importData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Publisher.deleteMany()
    await Category.deleteMany()
    await Address.deleteMany()
    await Review.deleteMany()
    await Order.deleteMany()

    const createdUsers = await User.insertMany(users)

    const createdPublishers = await Publisher.insertMany(publishers)

    const createdCategories = await Category.insertMany(categories)

    const adminUser = createdUsers[0]._id

    const productCategory = createdCategories[0]._id
    const productPublisher = createdPublishers[0]._id

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
        category: productCategory,
        publisher: productPublisher,
      }
    })

    const sampleAddresses = addresses.map((address) => {
      return {
        ...address,
        user: adminUser,
      }
    })


    await Product.insertMany(sampleProducts)
    await Address.insertMany(sampleAddresses)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Publisher.deleteMany()
    await Category.deleteMany()
    await Address.deleteMany()
    await Review.deleteMany()
    await Order.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
