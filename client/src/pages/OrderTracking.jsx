import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Bike, CheckCircle2, Clock, MapPin, MessageCircle, PackageCheck, Phone, ShieldCheck, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { getOrderById, orderStatuses, updateStoredOrderStatus } from '../utils/commerceStorage';

const statusMessages = {
  Placed: 'Store received your order',
  Confirmed: 'Inventory locked and bill verified',
  Packed: 'Items packed and quality checked',
  'Out for Delivery': 'Rider is on the way',
  Delivered: 'Delivered at your doorstep'
};

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(() => getOrderById(id));
  const [etaSeconds, setEtaSeconds] = useState(600);
  const [progress, setProgress] = useState(6);

  useEffect(() => {
    if (!order) return;
    const createdAt = new Date(order.createdAt).getTime();
    const elapsed = Math.max(0, Math.floor((Date.now() - createdAt) / 1000));
    setEtaSeconds(Math.max(0, 600 - elapsed));
    setProgress(Math.min(96, 6 + elapsed * 0.15));
  }, [order]);

  useEffect(() => {
    if (!order) return undefined;

    const interval = setInterval(() => {
      setEtaSeconds((value) => Math.max(0, value - 1));
      setProgress((value) => Math.min(100, value + 0.8));

      setOrder((current) => {
        if (!current) return current;
        const elapsed = Math.floor((Date.now() - new Date(current.createdAt).getTime()) / 1000);
        const nextStatus = elapsed > 95 ? 'Delivered' : elapsed > 62 ? 'Out for Delivery' : elapsed > 38 ? 'Packed' : elapsed > 16 ? 'Confirmed' : 'Placed';
        if (nextStatus === current.orderStatus) return current;
        const updatedOrders = updateStoredOrderStatus(current._id, nextStatus);
        return updatedOrders.find((item) => item._id === current._id) || { ...current, orderStatus: nextStatus };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [order]);

  const statusIndex = order ? orderStatuses.indexOf(order.orderStatus) : -1;
  const etaLabel = useMemo(() => {
    if (!order || order.orderStatus === 'Delivered') return 'Delivered';
    const minutes = Math.max(0, Math.ceil(etaSeconds / 60));
    if (minutes <= 1) return 'Arriving now';
    if (minutes <= 3) return `${minutes} mins away`;
    return `${minutes} mins`;
  }, [etaSeconds, order]);

  if (!order) {
    return (
      <div className="pt-24 min-h-screen bg-[#F7F8FA] flex items-center justify-center px-4">
        <div className="bg-white rounded-[2rem] p-10 border border-slate-100 text-center max-w-md">
          <PackageCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-slate-900 mb-3">Order not found</h1>
          <p className="text-sm font-bold text-slate-400 mb-8">This order is not available on this device.</p>
          <button onClick={() => navigate('/orders')} className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">View Orders</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <main className="space-y-8">
            <section className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 overflow-hidden relative">
              <div className="absolute right-0 top-0 w-2/3 h-full bg-[var(--primary)] opacity-10 blur-[90px]"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-green-300 mb-3">Order {order.orderId}</p>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight">{etaLabel}</h1>
                  <p className="text-slate-400 font-bold mt-3">{statusMessages[order.orderStatus]}</p>
                </div>
                <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-28 h-28 bg-white/10 border border-white/10 rounded-[2rem] flex items-center justify-center">
                  {order.orderStatus === 'Delivered' ? <CheckCircle2 className="w-12 h-12 text-green-300" /> : <Bike className="w-12 h-12 text-green-300" />}
                </motion.div>
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-8">Live delivery simulation</h2>
              <div className="relative h-[280px] rounded-[2rem] overflow-hidden bg-[#ECFDF5] border border-green-100">
                <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(#bbf7d0 1px, transparent 1px), linear-gradient(90deg, #bbf7d0 1px, transparent 1px)', backgroundSize: '36px 36px' }}></div>
                <div className="absolute left-10 right-10 top-1/2 h-2 bg-white rounded-full shadow-inner"></div>
                <div className="absolute left-10 top-1/2 h-2 bg-[var(--primary)] rounded-full" style={{ width: `calc((100% - 5rem) * ${progress / 100})` }}></div>
                <div className="absolute left-8 top-[calc(50%-18px)] w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl"><ShoppingBag className="w-5 h-5" /></div>
                <motion.div className="absolute top-[calc(50%-22px)] w-12 h-12 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-green-200" animate={{ left: `calc(2.5rem + (100% - 6rem) * ${progress / 100})` }} transition={{ duration: 0.7 }}>
                  <Bike className="w-6 h-6" />
                </motion.div>
                <div className="absolute right-8 top-[calc(50%-18px)] w-10 h-10 bg-white text-[var(--primary)] rounded-2xl flex items-center justify-center shadow-xl border border-green-100"><MapPin className="w-5 h-5" /></div>
                <div className="absolute left-6 bottom-6 right-6 bg-white/90 backdrop-blur rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rider status</p>
                    <p className="font-black text-slate-900">{order.orderStatus === 'Delivered' ? 'Delivery completed' : order.orderStatus === 'Out for Delivery' ? 'Rider is on the way' : 'Store is preparing your order'}</p>
                  </div>
                  <p className="text-sm font-black text-[var(--primary)]">{etaLabel}</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-8">Delivery progress</h2>
              <div className="space-y-5">
                {orderStatuses.map((status, index) => {
                  const done = index <= statusIndex;
                  return (
                    <div key={status} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${done ? 'bg-[var(--primary)] text-white' : 'bg-slate-100 text-slate-300'}`}>
                        {done ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-black ${done ? 'text-slate-900' : 'text-slate-400'}`}>{status}</p>
                        <p className="text-xs font-bold text-slate-400">{statusMessages[status]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6">Order details</h3>
              <div className="space-y-4">
                {order.items.slice(0, 4).map((item) => (
                  <div key={item._id || item.name} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl bg-slate-50 object-contain p-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-900 truncate">{item.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">Qty {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total paid</span>
                <span className="text-2xl font-black text-slate-900">₹{order.totalAmount}</span>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-5">Rider</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black">{order.rider?.avatar || 'AV'}</div>
                <div>
                  <p className="font-black text-slate-900">{order.rider?.name || 'Aman Verma'}</p>
                  <p className="text-xs font-bold text-slate-400">{order.rider?.vehicle || 'Electric scooter'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="h-12 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> Call</button>
                <button className="h-12 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" /> Chat</button>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
                <p className="font-black text-slate-900">Delivery address</p>
              </div>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">{order.address?.street || order.shippingAddress?.street}, {order.address?.city || order.shippingAddress?.city} {order.address?.zipCode || order.shippingAddress?.zipCode}</p>
            </div>

            <Link to="/orders" className="block text-center h-14 leading-[3.5rem] bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">View all orders</Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
