import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res) => {
  const line_items = req.body.cartItems.map(item => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item.id
          }
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity,
    }
  })

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    })

    console.log(session);
    res.send({ url: session.url })
  } catch (error) {
    console.log(error);
  }
}

const getStripeApiKey = async (req, res) => {
  res.status(StatusCodes.OK).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  })
}

export { getStripeApiKey, createCheckoutSession }
