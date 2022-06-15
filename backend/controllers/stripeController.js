import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
import OrderModel from '../models/OrderModel.js'
import Order from '../models/Order.js'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res) => {
  const customer = await stripe.customers.create({
    
  });

  const line_items = req.body.orderItems.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image?.url],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });


  res.send({ url: session.url })
}

const createOrder = async (req, res) => {

  const newOrder = new Order({
    totalPrice: res.data.totalPrice,
    shippingAddress: res.data.shippingAddress,
    paymentMethod: res.data.paymentMethod,
    orderItems: res.data.orderItems,
    user: res.data.user,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

const webhook = async (req, res) => {
  const signature = req.headers['stripe-signature']

  let data
  let eventType
  let endpointSecret
  endpointSecret = process.env.STRIPE_WEBHOOK

  if (endpointSecret) {
    let event

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        endpointSecret
      )
      console.log('Webhook verified.')
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(`Webhook Error: ${err.message}`)
    }
    // Extract the object from the event.
    data = event.data.object
    eventType = event.type
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data.object
    eventType = req.body.type
  }

  // Handle the checkout.session.completed event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          console.log(data)
          console.log(customer)
        } catch (err) {
          console.log(typeof createOrder);
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send().end()
}

/* ************************************************************************************ */
const getStripeApiKey = async (req, res) => {
  res.status(StatusCodes.OK).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  })
}

const createPayment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(stripeErr)
      } else {
        res.status(StatusCodes.OK).json(stripeRes)
      }
    }
  )
}

export { getStripeApiKey, createCheckoutSession, createPayment, webhook }
