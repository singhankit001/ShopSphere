const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, paymentStatus, totalAmount, bill } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user: req.user._id,
      orderId: `SS-${Date.now().toString(36).toUpperCase()}`,
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentStatus || (paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid'),
      totalAmount,
      bill,
      estimatedDeliveryTime: new Date(Date.now() + 10 * 60 * 1000),
    });

    const createdOrder = await order.save();

    // Clear user cart after order
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], totalPrice: 0 });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email').sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.orderStatus = req.body.status || order.orderStatus;
    if (order.orderStatus === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
