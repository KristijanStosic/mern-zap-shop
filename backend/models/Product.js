import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxLength: [100, 'Name cannot be more than 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxLength: [1000, 'Description cannot be more than 1000 characters'],
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '/uploads/example.jpg',
    },
    cloudinary_id: {
      type: String,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    gameLength: {
      type: String,
      required: [true, 'Please provide game length'],
    },
    minPlayers: {
      type: Number,
      required: [true, 'Please provide minimum number of players'],
    },
    maxPlayers: {
      type: Number,
      required: [true, 'Please provide maximum number of players'],
    },
    sku: {
      type: String,
      required: [true, 'Please provide sku'],
    },
    suggestedAge: {
      type: String,
      required: [true, 'Please provide suggested age'],
    },
    languageOfPublication: {
      type: String,
      required: [true, 'Please provide language of publication'],
    },
    languageDependence: {
      type: String,
      required: [true, 'Please provide language dependence'],
    },
    originCountry: {
      type: String,
      required: [true, 'Please provide origin country'],
    },
    designer: {
      type: String,
      required: [true, 'Please provide designer'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publisher',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
})

// when deleting product, remove all reviews associate with that product
ProductSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ product: this._id })
})

export default mongoose.model('Product', ProductSchema)
