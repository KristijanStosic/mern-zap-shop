import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
import { updateOrderToPaid } from './orderController.js'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

let order

const createCheckoutSession = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.user,
    },
  })
  order = req.body.order
  const line_items = order.orderItems.map((item) => {
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
    mode: 'payment',
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  })

  res.send({ url: session.url })
}

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
  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          console.log('Data from stripe', data)
          console.log('Customer', customer)
          updateOrderToPaid(order, data)
        } catch (err) {
          console.log(err)
        }
      })
      .catch((err) => console.log(err.message))
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send().end()
}

export { createCheckoutSession, webhook }
