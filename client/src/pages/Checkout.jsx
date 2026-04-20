import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, ChevronRight, CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Zap, Phone, Home } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { clearCart } from '../store/slices/cartSlice';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    zipCode: '',
    phone: ''
  });

  const subtotal = items.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      navigate('/products');
    }
    window.scrollTo(0, 0);
  }, [items.length, orderPlaced, navigate]);

  const handlePlaceOrder = async () => {
    if (!user) return navigate('/login');
    if (!address.street || !address.zipCode || !address.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items,
        shippingAddress: address,
        paymentMethod: 'Cash on Delivery',
        totalAmount: total,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post('http://localhost:5001/api/orders', orderData, config);
      toast.success('Order placed successfully!');
      setOrderPlaced(true);
      dispatch(clearCart());
      setTimeout(() => {
        navigate('/orders');
      }, 4000);
    } catch (err) {
      // For demo purposes, even if API fails, we can simulate success if needed
      // but let's keep it real.
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="pt-24 pb-20 px-4 min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md w-full text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: 'spring', damping: 12 }}
            className="w-24 h-24 rounded-[2rem] bg-green-500 flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-100"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Order Confirmed!</h2>
          <p className="text-slate-500 font-medium mb-12 leading-relaxed">
            Your items are being packed and will arrive in <span className="text-[var(--primary)] font-black">12 minutes</span>.
          </p>
          <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 mb-10">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[9px] font-black uppercase">Instant Packing</span>
             </div>
             <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm">
                   <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Estimated Delivery</p>
                   <p className="text-lg font-black text-slate-900">8-12 Minutes</p>
                </div>
             </div>
          </div>
          <button 
            onClick={() => navigate('/orders')}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200"
          >
            Track Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-10">
           <button onClick={() => navigate('/cart')} className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100 transition-all">
              <ArrowLeft className="w-5 h-5" />
           </button>
           <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Details */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[var(--primary)]">
                     <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-slate-900">Delivery Address</h2>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Instant delivery to your home</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-3">
                     <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        <Home className="w-3 h-3" /> House No. / Flat / Area
                     </label>
                     <input 
                       type="text"
                       placeholder="e.g. 5/122, Vineet Khand, Gomti Nagar"
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                       value={address.street}
                       onChange={(e) => setAddress({...address, street: e.target.value})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pincode</label>
                     <input 
                       type="text"
                       placeholder="226010"
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                       value={address.zipCode}
                       onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        <Phone className="w-3 h-3" /> Contact Number
                     </label>
                     <input 
                       type="text"
                       placeholder="9876543210"
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                       value={address.phone}
                       onChange={(e) => setAddress({...address, phone: e.target.value})}
                     />
                  </div>
               </div>
            </div>

            {/* Payment Selection */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                     <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-slate-900">Payment Method</h2>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Securely pay for your order</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-[2rem] border-2 border-[var(--primary)] bg-green-50/30 flex items-center justify-between cursor-pointer group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-sm">
                           <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="font-black text-slate-900 text-sm">Cash on Delivery</p>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pay at Doorstep</p>
                        </div>
                     </div>
                     <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                     </div>
                  </div>
                  <div className="p-6 rounded-[2rem] border-2 border-slate-100 bg-white opacity-50 flex items-center justify-between cursor-not-allowed group grayscale">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                           <Zap className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="font-black text-slate-400 text-sm">Online Payment</p>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Available Soon</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Review Order Summary */}
          <div className="space-y-6 lg:sticky lg:top-24">
             <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-900 text-xl mb-8 tracking-tight">Bill Details</h3>
                
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span className="text-slate-900 font-black">₹{subtotal}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <span>Delivery Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-[var(--primary)] font-black">FREE</span>
                      ) : (
                        <span className="text-slate-900 font-black">₹{deliveryFee}</span>
                      )}
                   </div>
                   <div className="pt-6 border-t border-slate-50 flex justify-between items-end">
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Payable</p>
                         <p className="text-3xl font-black text-slate-900 tracking-tighter">₹{total}</p>
                      </div>
                      <ShieldCheck className="w-8 h-8 text-slate-100" />
                   </div>
                </div>

                <button 
                   onClick={handlePlaceOrder}
                   disabled={loading}
                   className="w-full py-5 bg-[var(--primary)] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[var(--primary-dark)] transition-all shadow-xl shadow-green-100 disabled:opacity-50 group"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>Confirm Order <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
                
                <div className="mt-8 flex items-center justify-center gap-3 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Delivering in 8-12 minutes</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
