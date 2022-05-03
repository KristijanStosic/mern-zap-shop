import mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema({
    street: {
      type: String,
      required: [true, 'Please provide street'],
      default: 'my street',
      unique: true
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
      required: [true, 'Please provide country'],
      default: 'my country',
    },
  },
  {
    timestamps: true,
})

export default mongoose.model('Address', AddressSchema)
