import { products as fallbackProducts } from '../data/shopData';

const ORDERS_KEY = 'shopsphere_orders';
const PRODUCTS_KEY = 'shopsphere_admin_products';
const DELETED_PRODUCTS_KEY = 'shopsphere_deleted_products';

const safeRead = (key, fallback = []) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

const safeWrite = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not save ${key}`, error);
  }
};

export const orderStatuses = ['Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];

export const getStoredOrders = () => safeRead(ORDERS_KEY, []);

export const saveStoredOrders = (orders) => safeWrite(ORDERS_KEY, orders);

export const getOrderById = (id) => getStoredOrders().find((order) => order._id === id || order.orderId === id);

export const upsertStoredOrder = (order) => {
  const orders = getStoredOrders();
  const existingIndex = orders.findIndex((item) => item._id === order._id || item.orderId === order.orderId);
  const nextOrders = existingIndex >= 0
    ? orders.map((item, index) => (index === existingIndex ? { ...item, ...order } : item))
    : [order, ...orders];
  saveStoredOrders(nextOrders);
  return nextOrders;
};

export const updateStoredOrderStatus = (id, status) => {
  const orders = getStoredOrders().map((order) => {
    if (order._id !== id && order.orderId !== id) return order;
    return {
      ...order,
      orderStatus: status,
      paymentStatus: status === 'Delivered' && order.paymentMethod === 'Cash on Delivery' ? 'Paid' : order.paymentStatus,
      deliveredAt: status === 'Delivered' ? new Date().toISOString() : order.deliveredAt
    };
  });
  saveStoredOrders(orders);
  return orders;
};

export const createLocalOrder = ({ items, address, paymentMethod, bill, user }) => {
  const now = new Date();
  const orderId = `SS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  return {
    _id: `local-${Date.now()}`,
    orderId,
    userId: user?._id || user?.id || 'guest',
    user: user ? { name: user.name || 'ShopSphere User', email: user.email || 'guest@shopsphere.local' } : { name: 'Guest Customer', email: 'guest@shopsphere.local' },
    items: items.map((item) => ({
      product: item._id,
      _id: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.discountPrice || item.price,
      image: item.image,
      weight: item.weight,
      brand: item.brand,
      category: item.category || item.categorySlug
    })),
    totalAmount: bill.total,
    bill,
    address,
    shippingAddress: address,
    paymentMethod,
    paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
    orderStatus: 'Placed',
    createdAt: now.toISOString(),
    estimatedDeliveryTime: new Date(now.getTime() + 10 * 60 * 1000).toISOString(),
    rider: {
      name: 'Aman Verma',
      phone: '+91 98765 43210',
      avatar: 'AV',
      vehicle: 'Electric scooter'
    }
  };
};

export const getManagedProducts = () => safeRead(PRODUCTS_KEY, []);

export const getCatalogProducts = () => {
  const managed = getManagedProducts();
  const managedIds = new Set(managed.map((product) => product._id));
  const deletedIds = new Set(safeRead(DELETED_PRODUCTS_KEY, []));
  return [
    ...managed.filter((product) => !deletedIds.has(product._id)),
    ...fallbackProducts.filter((product) => !managedIds.has(product._id) && !deletedIds.has(product._id))
  ];
};

export const upsertManagedProduct = (product) => {
  const products = getManagedProducts();
  const normalized = {
    ...product,
    _id: product._id || `local-product-${Date.now()}`,
    price: Number(product.price) || 0,
    discountPrice: product.discountPrice ? Number(product.discountPrice) : undefined,
    stock: Number(product.stock) || 0,
    rating: product.rating || 4.7,
    reviews: product.reviews || 120,
    deliveryTime: product.deliveryTime || '10'
  };
  const exists = products.some((item) => item._id === normalized._id);
  const nextProducts = exists
    ? products.map((item) => (item._id === normalized._id ? normalized : item))
    : [normalized, ...products];
  safeWrite(PRODUCTS_KEY, nextProducts);
  safeWrite(DELETED_PRODUCTS_KEY, safeRead(DELETED_PRODUCTS_KEY, []).filter((id) => id !== normalized._id));
  return normalized;
};

export const deleteManagedProduct = (id) => {
  const nextProducts = getManagedProducts().filter((product) => product._id !== id);
  safeWrite(PRODUCTS_KEY, nextProducts);
  const deletedIds = new Set(safeRead(DELETED_PRODUCTS_KEY, []));
  deletedIds.add(id);
  safeWrite(DELETED_PRODUCTS_KEY, Array.from(deletedIds));
  return nextProducts;
};
