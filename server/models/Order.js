const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    orderId: {
      type: String,
      unique: true,
      index: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        productId: { type: String },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      phone: { type: String },
      landmark: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Cash on Delivery',
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    bill: {
      itemTotal: { type: Number, default: 0 },
      deliveryFee: { type: Number, default: 0 },
      handlingFee: { type: Number, default: 0 },
      taxes: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    paymentStatus: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      index: true,
    },
    orderStatus: {
      type: String,
      required: true,
      default: 'Placed',
      enum: ['Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'],
      index: true,
    },
    estimatedDeliveryTime: {
      type: Date,
    },
    deliveryETA: {
      minutes: { type: Number, default: 10 },
      distanceKm: { type: Number, default: 2 },
      orderLoad: { type: Number, default: 1 },
      computedAt: { type: Date, default: Date.now },
    },
    riderLocation: {
      lat: Number,
      lng: Number,
      updatedAt: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
