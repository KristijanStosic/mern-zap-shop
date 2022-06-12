import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    products: [
      { productId: { type: String }, quantity: { type: Number, default: 1 } },
    ],
    subtotal: { type: Number },
    total: { type: Number },
    shipping: { type: Object },
    delivery_status: { type: String, default: 'pending' },
    payment_status: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('OrderModel', orderSchema)
