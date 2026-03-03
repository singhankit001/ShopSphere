const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    deliveryTime: {
      type: String,
      default: '15 min',
    },
    brand: {
      type: String,
      required: true,
      index: true,
    },
    weight: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    popularity: {
      type: Number,
      default: 0,
      index: true,
    },
    tags: [String],
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', brand: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1, rating: -1 });

productSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();
  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
  next();
});

module.exports = mongoose.model('Product', productSchema);
