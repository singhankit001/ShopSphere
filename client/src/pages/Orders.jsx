import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Package, Clock, ChevronRight, ShoppingBag, ArrowLeft, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EmptyState from '../components/common/EmptyState';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5001/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchOrders();
    window.scrollTo(0, 0);
  }, [user, navigate]);

  if (loading) return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-[#F7F8FA]">
       <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--primary)] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F7F8FA]">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">My Orders</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Track and manage your instant deliveries</p>
          </div>
          <Link to="/products" className="text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 flex items-center gap-2">
             <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center border border-slate-100 shadow-sm">
            <EmptyState 
              icon={Package}
              title="No orders yet"
              description="Start your first order and experience the magic of 8-minute delivery!"
              buttonText="Start Shopping"
              buttonLink="/products"
            />
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, idx) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all group"
              >
                {/* Order Status Strip */}
                <div className={`px-8 py-3 flex items-center justify-between ${
                  order.orderStatus === 'Delivered' ? 'bg-green-500' : 'bg-slate-900'
                }`}>
                   <div className="flex items-center gap-2">
                      {order.orderStatus === 'Delivered' ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <Zap className="w-4 h-4 text-green-400 animate-pulse" />
                      )}
                      <span className="text-white font-black text-[10px] uppercase tracking-[0.2em]">
                        {order.orderStatus === 'Delivered' ? 'Order Delivered' : 'Express Packing'}
                      </span>
                   </div>
                   <span className="text-white/50 font-bold text-[9px] uppercase tracking-widest">
                     Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                   </span>
                </div>

                <div className="p-8 md:p-10">
                   <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
                      <div className="space-y-4 flex-1">
                         {order.items.map((item, i) => (
                           <div key={i} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-50 p-2">
                                 <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="font-black text-slate-900 text-sm truncate">{item.name}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-black text-slate-900 text-sm">₹{item.price * item.quantity}</p>
                           </div>
                         ))}
                      </div>

                      <div className="w-full md:w-48 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col justify-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Amount Paid</p>
                         <p className="text-2xl font-black text-slate-900 text-center tracking-tighter">₹{order.totalAmount}</p>
                         <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-[9px] font-black text-slate-400 uppercase">Paid Via COD</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-50">
                      <div className="flex items-center gap-4">
                         <div className="flex -space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-white text-[10px] font-black">S</div>
                            <div className="w-8 h-8 rounded-full bg-[var(--primary)] border-2 border-white flex items-center justify-center text-white text-[10px] font-black italic underline">Z</div>
                         </div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivered by ShopSphere Express</p>
                      </div>
                      
                      <Link to={`/orders/${order._id}`} className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all flex items-center gap-2 shadow-sm">
                         View Details <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Support Section */}
        <div className="mt-16 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900">
                 <Clock className="w-6 h-6" />
              </div>
              <div>
                 <p className="font-black text-slate-900 text-sm">Need help with an order?</p>
                 <p className="text-xs font-medium text-slate-400">Our support team is available 24/7</p>
              </div>
           </div>
           <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
              Chat With Us
           </button>
        </div>

      </div>
    </div>
  );
};

export default Orders;
