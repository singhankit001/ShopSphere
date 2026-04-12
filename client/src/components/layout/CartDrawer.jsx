import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Clock, Zap, MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F7F8FA] z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-white px-6 py-5 flex items-center justify-between border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">My Cart</h2>
                <span className="px-2 py-0.5 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase">{items.length} Items</span>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-900" />
              </button>
            </div>

            {/* Delivery Timeline / Location */}
            <div className="bg-white p-6 border-b border-slate-100 shrink-0">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[var(--primary)] shrink-0">
                    <Zap className="w-5 h-5 fill-current" />
                 </div>
                 <div className="flex-1">
                    <p className="text-[11px] font-black text-slate-900 uppercase tracking-tighter mb-1">Delivering in 8-12 mins</p>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                       <MapPin className="w-3.5 h-3.5" />
                       <span className="truncate">Gomti Nagar, Lucknow, 226010</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center mb-6 shadow-sm">
                    <ShoppingBag className="w-12 h-12 text-slate-200" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Cart is empty</h3>
                  <p className="text-slate-400 font-medium text-sm mb-10 max-w-[200px] mx-auto">
                    Looks like you haven't added anything yet.
                  </p>
                  <button 
                    onClick={onClose}
                    className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 divide-y divide-slate-50">
                  {items.map((item) => (
                    <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-50">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                          <button 
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className="text-slate-300 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 mb-3">{item.weight}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                             <span className="font-black text-slate-900 text-sm">₹{(item.discountPrice || item.price) * item.quantity}</span>
                             {item.discountPrice && (
                               <span className="text-[10px] text-slate-400 line-through font-bold">₹{item.price * item.quantity}</span>
                             )}
                          </div>
                          
                          <div className="flex items-center bg-[var(--primary)] text-white rounded-xl overflow-hidden shadow-lg shadow-green-100 h-8">
                            <button 
                              onClick={() => item.quantity > 1 ? dispatch(updateCartQuantity({ id: item._id, quantity: item.quantity - 1 })) : dispatch(removeFromCart(item._id))}
                              className="w-7 h-full flex items-center justify-center hover:bg-black/10"
                            ><Minus className="w-3 h-3" /></button>
                            <span className="w-6 text-center font-black text-xs">{item.quantity}</span>
                            <button 
                              onClick={() => dispatch(updateCartQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                              className="w-7 h-full flex items-center justify-center hover:bg-black/10"
                            ><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bill Details Info */}
              {items.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
                  <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">Bill Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                      <span>Item Total</span>
                      <span className="text-slate-900 font-black">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                      <span>Delivery Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-[var(--primary)] font-black">FREE</span>
                      ) : (
                        <span className="text-slate-900 font-black">₹{deliveryFee}</span>
                      )}
                    </div>
                    <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-sm font-black text-slate-900">To Pay</span>
                      <span className="text-xl font-black text-slate-900">₹{total}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4.5 bg-[var(--primary)] text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-between px-8 hover:bg-[var(--primary-dark)] transition-all shadow-xl shadow-green-100 group"
                >
                  <div className="flex flex-col items-start leading-tight">
                    <span>₹{total}</span>
                    <span className="text-[9px] opacity-80 uppercase font-bold">Total Payable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    Proceed to Pay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
