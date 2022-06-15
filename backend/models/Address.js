import mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema({
    street: {
      type: String,
      required: [true, 'Please provide street'],
      default: 'my street',
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
      default: 'my city',
    },
    postalCode: {
      type: String,
      maxLength: 5,
      default: '00000',
    },
    country: {
      type: String,
      default: 'my country',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
})

export default mongoose.model('Address', AddressSchema)
