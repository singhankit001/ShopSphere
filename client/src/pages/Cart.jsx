import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, ChevronLeft, Ticket, ShieldCheck, Zap } from 'lucide-react';
import { updateCartQuantity, removeFromCart } from '../store/slices/cartSlice';
import EmptyState from '../components/common/EmptyState';
import { motion } from 'framer-motion';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 px-4 min-h-screen bg-[#F7F8FA] flex items-center justify-center">
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
    <div className="pt-24 pb-20 px-4 bg-[#F7F8FA] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Shopping Cart</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--primary)]" /> 100% Safe & Secure Checkout
            </p>
          </div>
          <Link to="/products" className="text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Details</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:block">Price</span>
              </div>
              
              <div className="divide-y divide-slate-50">
                {items.map((item) => (
                  <motion.div 
                    key={item._id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 flex flex-col md:flex-row items-center gap-6 group"
                  >
                    <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
                       <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left min-w-0">
                      <h3 className="font-black text-slate-900 text-lg mb-1 leading-tight truncate">{item.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 mb-4">{item.weight}</p>
                      
                      <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="flex items-center bg-slate-100 rounded-xl p-1">
                          <button 
                            onClick={() => item.quantity > 1 ? dispatch(updateCartQuantity({ id: item._id, quantity: item.quantity - 1 })) : dispatch(removeFromCart(item._id))}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-black"
                          ><Minus className="w-4 h-4" /></button>
                          <span className="w-8 text-center font-black text-slate-900 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateCartQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-black"
                          ><Plus className="w-4 h-4" /></button>
                        </div>
                        
                        <button 
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="shrink-0 text-center md:text-right">
                       <p className="text-xl font-black text-slate-900">₹{(item.discountPrice || item.price) * item.quantity}</p>
                       {item.discountPrice && (
                         <p className="text-[10px] text-slate-400 line-through font-bold">₹{item.price * item.quantity}</p>
                       )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Promise Banner */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-slate-200">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--primary)] opacity-10 blur-[100px]"></div>
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-[var(--primary)] rounded-3xl flex items-center justify-center text-white shadow-xl shadow-green-900/40">
                     <Zap className="w-8 h-8 fill-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-1">Express Delivery</h3>
                    <p className="text-slate-400 font-medium text-sm">Arriving at your doorstep in <span className="text-[var(--primary)] font-black">8-12 minutes</span>.</p>
                  </div>
               </div>
               <div className="text-right relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Service Status</p>
                  <p className="text-green-500 font-black flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Tracking Available
                  </p>
               </div>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm sticky top-24">
               <h3 className="font-black text-slate-900 text-xl mb-8 tracking-tight">Price Details</h3>
               
               <div className="space-y-4 mb-8">
                 <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                   <span>Item Total</span>
                   <span className="text-slate-900">₹{subtotal}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                   <span>Delivery Fee</span>
                   {deliveryFee === 0 ? (
                     <span className="text-[var(--primary)] font-black uppercase tracking-widest text-[10px]">Free</span>
                   ) : (
                     <span className="text-slate-900">₹{deliveryFee}</span>
                   )}
                 </div>
                 <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Grand Total</p>
                      <p className="text-3xl font-black text-slate-900">₹{total}</p>
                   </div>
                   <ShieldCheck className="w-10 h-10 text-slate-100" />
                 </div>
               </div>

               <div className="relative mb-8 group">
                  <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Enter Coupon Code"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-xs font-black outline-none focus:bg-white focus:border-[var(--primary)] transition-all"
                  />
               </div>

               <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full py-5 bg-[var(--primary)] text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[var(--primary-dark)] transition-all shadow-xl shadow-green-100 text-sm uppercase tracking-widest group"
               >
                 Confirm Order <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
               
               <p className="text-center mt-6 text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                 By proceeding, you agree to our <br /> Terms of Service and Privacy Policy
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
