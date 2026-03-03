import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Clock, Zap, MapPin, ShieldCheck, Ticket } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartQuantity, removeFromCart, selectCartSubtotal, selectCartGrandTotal, selectCartTotalQuantity } from '../../store/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items } = useSelector((state) => state.cart);
  const subtotal = useSelector(selectCartSubtotal);
  const total = useSelector(selectCartGrandTotal);
  const itemsCount = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deliveryFee = subtotal > 500 ? 0 : 25;
  const handlingFee = items.length > 0 ? 5 : 0;

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

  const handleStartShopping = () => {
    onClose();
    navigate('/products');
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-[480px] bg-white z-[1001] shadow-[-20px_0_80px_-20px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden box-border"
          >
            {/* Header - Sticky */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-8 py-6 flex items-center justify-between border-b border-slate-50 shrink-0 z-20">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight font-premium">My Basket</h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-xl border border-green-100">
                  <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-wider">{itemsCount} {itemsCount === 1 ? 'Item' : 'Items'}</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all hover:rotate-90"
              >
                <X className="w-6 h-6 text-slate-900" />
              </button>
            </div>

            {/* Content Area */}
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFDFD] p-6 pb-40">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center mb-10 shadow-[0_32px_60px_-20px_rgba(0,0,0,0.08)] relative">
                     <ShoppingBag className="w-24 h-24 text-slate-100" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-14 h-14 text-[var(--primary)] opacity-30 rotate-12" />
                     </div>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight font-premium">Your basket is empty</h3>
                  <p className="text-slate-400 font-bold text-base mb-12 leading-relaxed max-w-[320px]">
                    Add fresh groceries and daily essentials to get them delivered in 8 minutes.
                  </p>
                  <button 
                    onClick={handleStartShopping}
                    className="w-full h-16 bg-[var(--primary)] text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-[var(--primary-dark)] transition-all shadow-xl shadow-green-100 active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {/* Delivery Banner Section */}
                  <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 flex items-center gap-5 shadow-sm mb-1">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[var(--primary)] shrink-0 shadow-inner">
                      <Zap className="w-7 h-7 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-1.5 leading-none">Delivering in 8-12 mins</p>
                      <p className="text-[13px] font-bold text-slate-400 truncate">Gomti Nagar, Lucknow • Home</p>
                    </div>
                  </div>

                  {/* Items List Section */}
                  <div className="bg-white rounded-[2.5rem] p-3 shadow-sm border border-slate-50 flex flex-col gap-3">
                    {items.map((item) => (
                      <div key={item._id} className="p-4 flex gap-5 bg-slate-50/30 rounded-3xl border border-slate-50/50 relative group">
                        <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-3" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                          <div className="pr-8">
                             <h4 className="font-black text-slate-900 text-sm leading-[1.4] mb-1 font-premium">{item.name}</h4>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-3">{item.weight}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex flex-col gap-0.5">
                               <span className="font-black text-slate-900 text-base font-premium leading-none">₹{(item.discountPrice || item.price) * item.quantity}</span>
                               {item.discountPrice && (
                                 <span className="text-[10px] text-slate-300 line-through font-bold leading-none">₹{item.price * item.quantity}</span>
                               )}
                            </div>
                            
                            <div className="flex items-center bg-[#0F172A] text-white rounded-xl h-9 px-1 shadow-lg">
                              <button 
                                onClick={() => item.quantity > 1 ? dispatch(updateCartQuantity({ id: item._id, quantity: item.quantity - 1 })) : dispatch(removeFromCart(item._id))}
                                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-all"
                              ><Minus className="w-3.5 h-3.5" /></button>
                              <span className="w-6 text-center font-black text-xs">{item.quantity}</span>
                              <button 
                                onClick={() => dispatch(updateCartQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-all"
                              ><Plus className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Card Section */}
                  <div className="bg-white rounded-[2rem] p-5 px-6 border border-slate-50 flex items-center justify-between shadow-sm cursor-pointer hover:border-[var(--primary-light)] transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 shrink-0">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <span className="text-[13px] font-extrabold text-slate-700 tracking-tight leading-tight">Apply Coupon / Avail Offers</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Bill Summary Section */}
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-4">
                    <h3 className="font-black text-slate-900 text-[11px] uppercase tracking-[0.25em] mb-8 leading-none">Bill Summary</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-slate-400">
                           <ShoppingBag className="w-4 h-4" />
                           <span className="text-sm font-bold">Item Total</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-slate-400">
                           <Zap className="w-4 h-4" />
                           <span className="text-sm font-bold">Delivery Fee</span>
                        </div>
                        {deliveryFee === 0 ? (
                          <span className="text-sm font-black text-[var(--primary)] uppercase tracking-wider">Free</span>
                        ) : (
                          <span className="text-sm font-black text-slate-900">₹{deliveryFee}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-slate-400">
                           <ShieldCheck className="w-4 h-4" />
                           <span className="text-sm font-bold">Handling Fee</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">₹{handlingFee}</span>
                      </div>
                      
                      <div className="mt-4 pt-6 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-base font-black text-slate-900 uppercase tracking-tight font-premium leading-none">Grand Total</span>
                        <span className="text-2xl font-black text-slate-900 font-premium leading-none">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Safety Footer */}
                  <div className="pb-10 text-center">
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center justify-center gap-3 leading-none">
                        <ShieldCheck className="w-4 h-4" />
                        100% Safe Checkout
                     </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Checkout Button - Balanced Spacing */}
            {items.length > 0 && (
              <div className="sticky bottom-0 p-6 pb-8 bg-white/95 backdrop-blur-md border-t border-slate-50 shrink-0 z-20 shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.05)]">
                <button 
                  onClick={handleCheckout}
                  className="w-full h-20 bg-[#0F172A] text-white rounded-[2rem] font-extrabold text-[12px] uppercase tracking-[0.2em] flex items-center justify-between px-10 hover:bg-black transition-all shadow-2xl shadow-slate-200 group active:scale-95"
                >
                  <div className="flex flex-col items-start leading-[1.1]">
                    <span className="text-2xl font-premium tracking-tight">₹{total}</span>
                    <span className="text-[9px] opacity-50 uppercase tracking-[0.15em] font-black">Total Payable</span>
                  </div>
                  <div className="flex items-center gap-3">
                    Proceed <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
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
