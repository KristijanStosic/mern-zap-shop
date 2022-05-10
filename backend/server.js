import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import cloudinary from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// db and authenticateUser
import connectDB from './db/connect.js'

// routes
import categoryRoutes from './routes/categoryRoutes.js'
import publisherRoutes from './routes/publisherRoutes.js'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import userRoutes from './routes/userRoutes.js'
//import orderRoutes from './routes/orderRoutes.js'
import addressRoutes from './routes/addressRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import { permittedCrossDomainPolicies } from 'helmet'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(fileUpload({ useTempFiles: true }))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//app.use(cors())
//app.disable('etag');

app.get('/', (req, res) => {
  //console.log(req.signedCookies);
  res.json({ msg: 'Welcome' })
})

app.get('/api', (req, res) => {
  res.json({ msg: 'API running...' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/publishers', publisherRoutes)
app.use('/api/addresses', addressRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)
//app.use('/api/orders', orderRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    console.log(`Connection to MongoDB is successfully established...`)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(`Connection to MongoDB failed. Error: ${error}`)
  }
}

start()
