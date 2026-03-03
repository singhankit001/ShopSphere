import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bike, CheckCircle2, ChevronRight, Clock, Package, ShoppingBag, Zap } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import EmptyState from '../components/common/EmptyState';
import { getStoredOrders, upsertStoredOrder } from '../utils/commerceStorage';

const Orders = () => {
  const [orders, setOrders] = useState(getStoredOrders());
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.token) {
        try {
          const { data } = await axios.get('http://localhost:5001/api/orders/myorders', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          data.forEach((order) => upsertStoredOrder(order));
          setOrders(getStoredOrders());
        } catch {
          setOrders(getStoredOrders());
        }
      } else {
        setOrders(getStoredOrders());
      }
      setLoading(false);
    };
    fetchOrders();
    window.scrollTo(0, 0);
  }, [user]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#F7F8FA]">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--primary)] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F7F8FA]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">My Orders</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">Track every instant delivery</p>
          </div>
          <Link to="/products" className="h-12 px-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
            <ShoppingBag className="w-4 h-4" /> Shop more
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-12 md:p-20 border border-slate-100 shadow-sm">
            <EmptyState icon={Package} title="No orders yet" description="Place your first order and watch delivery move live." buttonText="Start Shopping" buttonLink="/products" />
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.article
                key={order._id || order.orderId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm"
              >
                <div className={`px-6 md:px-8 py-4 flex items-center justify-between ${order.orderStatus === 'Delivered' ? 'bg-green-500' : 'bg-slate-900'}`}>
                  <div className="flex items-center gap-2 text-white">
                    {order.orderStatus === 'Delivered' ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4 text-green-300 animate-pulse" />}
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{order.orderStatus}</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{order.orderId}</span>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_180px_170px] gap-6 items-center">
                  <div className="space-y-3">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item._id || item.name} className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-2xl bg-slate-50 object-contain p-2" />
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 text-sm truncate">{item.name}</p>
                          <p className="text-[10px] font-bold text-slate-400">Qty {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 rounded-[2rem] p-5 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Amount</p>
                    <p className="text-2xl font-black text-slate-900">₹{order.totalAmount}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{order.paymentMethod}</p>
                  </div>

                  <div className="flex md:flex-col gap-3">
                    <Link to={`/orders/${order._id}`} className="flex-1 h-12 px-5 bg-[var(--primary)] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                      Track <Bike className="w-4 h-4" />
                    </Link>
                    <div className="flex-1 h-12 px-5 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" /> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
