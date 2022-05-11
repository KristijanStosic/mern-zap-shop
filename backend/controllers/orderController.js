import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import { checkPermissions } from '../utils/index.js'

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue'
  return { client_secret, amount }
}

const createOrder = async (req, res) => {
  const { orderItems: cartItems, tax, shippingFee } = req.body

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items provided.')
  }

  if (!tax || !shippingFee) {
    throw new BadRequestError('Please provide tax and shipping fee')
  }

  let orderItems = []
  let subtotal = 0

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

    // add item to order
    orderItems = [...orderItems, singleOrderItem]
    // calculate subtotal
    subtotal += cartItem.quantity * price;
  }

  // calculate total
  const total = tax + shippingFee + subtotal;
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Success! Order created', order, clientSecret: order.clientSecret });
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ ordersCount: orders.length, orders });
}

const getOrderById = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
}

const getCurrentUserOrders = async(req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ ordersCount: orders.length, orders });
}

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  //const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);

  //order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ msg: 'Success! Order updated.' });
}

const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params

  const order = await Order.findOne({ _id: orderId })

  if (!order) {
    throw new NotFoundError(`No order with id ${orderId}`)
  }

  checkPermissions(req.user, order.user)
  await order.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Order removed' })
}

export {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getCurrentUserOrders,
  updateOrder,
}
