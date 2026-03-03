import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, ChevronLeft, Ticket, ShieldCheck, Zap, Lock } from 'lucide-react';
import { updateCartQuantity, removeFromCart } from '../store/slices/cartSlice';
import EmptyState from '../components/common/EmptyState';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 px-4 min-h-screen bg-[#FDFDFD] flex items-center justify-center">
        <div className="max-w-md w-full">
           <EmptyState 
            icon={ShoppingBag}
            title="Your basket is empty"
            description="Looks like you haven't added anything to your cart yet. Let's find something fresh for you!"
            buttonText="Explore Products"
            buttonLink="/products"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 bg-[#FDFDFD] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight font-premium">Shopping Basket</h1>
            <div className="flex items-center gap-3 mt-3">
               <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {items.length} {items.length === 1 ? 'Item' : 'Items'}
               </span>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-1.5">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Checkout
               </p>
            </div>
          </motion.div>
          <Link to="/products" className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] hover:text-emerald-500 flex items-center gap-2 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Keep Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          
          {/* Cart Items List */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Details</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:block">Price Analysis</span>
              </div>
              
              <div className="divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div 
                      key={item._id} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-8 flex flex-col md:flex-row items-center gap-8 group hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="w-28 h-28 bg-white rounded-2xl overflow-hidden shrink-0 border border-slate-100 flex items-center justify-center p-3 shadow-sm group-hover:scale-105 transition-transform duration-500">
                         <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      
                      <div className="flex-1 text-center md:text-left min-w-0">
                        <h3 className="font-black text-slate-900 text-xl mb-1 leading-tight truncate font-premium">{item.name}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{item.weight} • {item.brand || 'ShopSphere'}</p>
                        
                        <div className="flex items-center justify-center md:justify-start gap-6">
                          <div className="flex items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
                            <button 
                              onClick={() => item.quantity > 1 ? dispatch(updateCartQuantity({ id: item._id, quantity: item.quantity - 1 })) : dispatch(removeFromCart(item._id))}
                              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors"
                            ><Minus className="w-4 h-4" /></button>
                            <span className="w-10 text-center font-black text-slate-900 text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => dispatch(updateCartQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors"
                            ><Plus className="w-4 h-4" /></button>
                          </div>
                          
                          <button 
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="shrink-0 text-center md:text-right">
                         <p className="text-2xl font-black text-slate-900 tracking-tight">₹{(item.discountPrice || item.price) * item.quantity}</p>
                         {item.discountPrice && (
                           <p className="text-[11px] text-slate-300 line-through font-bold mt-1">₹{item.price * item.quantity}</p>
                         )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Delivery Promise Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
            >
               <div className="absolute top-0 right-0 w-2/3 h-full bg-emerald-500 opacity-5 blur-[120px]"></div>
               <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                     <Zap className="w-10 h-10 fill-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-1 font-premium tracking-tight">Flash Delivery</h3>
                    <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest">Arrival in <span className="text-emerald-400">8 - 12 minutes</span> guaranteed.</p>
                  </div>
               </div>
               <div className="text-right relative z-10">
                  <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                     <p className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em]">Live Tracking Active</p>
                  </div>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Service Operating Normally</p>
               </div>
            </motion.div>
          </div>

          {/* Checkout Summary */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] sticky top-28"
            >
               <h3 className="font-black text-slate-900 text-2xl mb-10 tracking-tight font-premium text-center md:text-left">Order Summary</h3>
               
               <div className="space-y-6 mb-10">
                 <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
                   <span>Basket Subtotal</span>
                   <span className="text-slate-900">₹{subtotal}</span>
                 </div>
                 <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
                   <span>Fulfillment Fee</span>
                   {deliveryFee === 0 ? (
                     <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">Complimentary</span>
                   ) : (
                     <span className="text-slate-900">₹{deliveryFee}</span>
                   )}
                 </div>
                 <div className="pt-8 border-t border-slate-50 flex justify-between items-end">
                    <div>
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">Grand Total</p>
                       <p className="text-5xl font-black text-slate-900 tracking-tighter">₹{total}</p>
                    </div>
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                       <Lock className="w-6 h-6" />
                    </div>
                 </div>
               </div>

               <div className="relative mb-10 group">
                  <Ticket className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="COUPON CODE"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-[11px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-slate-300"
                  />
               </div>

               <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full py-6 bg-emerald-500 text-white rounded-[24px] font-black flex items-center justify-center gap-4 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 text-[11px] uppercase tracking-[0.25em] group active:scale-95"
               >
                 Review & Checkout <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
               </button>
               
               <div className="mt-10 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 grayscale opacity-40">
                     {['Visa', 'UPI', 'Master'].map(pay => (
                       <span key={pay} className="text-[9px] font-black border border-slate-200 px-2 py-0.5 rounded-md text-slate-400 uppercase tracking-tighter">{pay}</span>
                     ))}
                  </div>
                  <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">
                    Encrypted transactions <br /> and verified payments
                  </p>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
