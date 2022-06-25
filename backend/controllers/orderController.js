import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const createOrder = async (req, res) => {
  let {
    orderItems: cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  } = req.body

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items provided.')
  }

  if (!taxPrice || !shippingPrice || !shippingAddress || !paymentMethod) {
    throw new BadRequestError(
      'Please provide tax, shipping fee, shipping addres, payament method'
    )
  }

  let orderItems = []
  itemsPrice = 0

  for (const cartItem of cartItems) {
    const dbProduct = await Product.findOne({ _id: cartItem.product })
    if (!dbProduct) {
      throw new NotFoundError(`No product with id: ${cartItem.product}`)
    }

    const { name, price, image, _id } = dbProduct

    const singleOrderItem = {
      quantity: cartItem.quantity,
      name,
      price,
      image,
      product: _id,
    }

    orderItems = [...orderItems, singleOrderItem]
    itemsPrice += cartItem.quantity * price // all items multipiled their quantity with price example: 3xgame1 + 2xgame2 

    if (cartItem.quantity > dbProduct.countInStock) {
      throw new BadRequestError(
        'You cannot order more products than count in stock'
      )
    }
    dbProduct.countInStock = dbProduct.countInStock - cartItem.quantity
    await dbProduct.save()
  }

  //let totalPrice = taxPrice + shippingPrice + itemsPrice

  const order = await Order.create({
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    itemsPrice,
    taxPrice,
    shippingPrice,
    paymentInfo,
    user: req.user.userId,
  })


  res.status(StatusCodes.CREATED).json({
    order,
  })
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.status(StatusCodes.OK).json({ ordersCount: orders.length, orders })
}

const getOrderById = async (req, res) => {
  const { id: orderId } = req.params

  const order = await Order.findOne({ _id: orderId }).populate('user', 'name email')

  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`)
  }
  //checkPermissions(req.user, order.user)
  res.status(StatusCodes.OK).json(order)
}

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
  res.status(StatusCodes.OK).json({ ordersCount: orders.length, orders })
}

const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params

  const order = await Order.findOne({ _id: orderId })

  if (!order) {
    throw new NotFoundError(`No order with id ${orderId}`)
  }

  await order.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Order removed' })
}

const updateOrderToPaid = async(order, data) => {
  //const { id: orderId } = req.params
  const orderToPaid = await Order.findOne({ _id: order._id })

  if (!orderToPaid) {
    throw new NotFoundError(`No order with id : ${order._id}`)
  }

  orderToPaid.status = 'paid'
  orderToPaid.isPaid = true 
  orderToPaid.paidAt = Date.now()
  orderToPaid.paymentInfo = data

  await orderToPaid.save()
  //res.status(StatusCodes.OK).json(updatedOrder)
}

const updateOrderToDelivered = async (req, res) => {
  const { id: orderId } = req.params

  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`)
  }

  if(order.isDelivered || order.status === 'delivered') {
    throw new BadRequestError('This order is already delivered')
  }

  order.status = 'delivered'
  order.isDelivered = true
  order.deliveredAt = Date.now()
  
  const updatedOrder = await order.save()

  res.status(StatusCodes.OK).json(updatedOrder)
}

export {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getMyOrders,
  updateOrderToDelivered,
  updateOrderToPaid
}
