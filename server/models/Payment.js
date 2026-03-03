const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      index: true,
    },
    orderId: {
      type: String,
      index: true,
    },
    provider: {
      type: String,
      enum: ['razorpay', 'stripe', 'cod'],
      default: 'razorpay',
    },
    providerOrderId: {
      type: String,
      index: true,
    },
    providerPaymentId: {
      type: String,
      index: true,
    },
    providerSignature: String,
    method: {
      type: String,
      default: 'UPI',
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    rawEvent: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
