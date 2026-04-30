import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, ChevronRight, CreditCard, 
  Home, Loader2, MapPin, Phone, ShieldCheck, 
  Smartphone, Wallet, Zap, ShieldAlert, Sparkles 
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { clearCart } from '../store/slices/cartSlice';
import { addOrder } from '../store/slices/orderSlice';
import { createLocalOrder } from '../utils/commerceStorage';

const paymentOptions = [
  { id: 'UPI', title: 'UPI Pay', detail: 'Scan and pay instantly', icon: Smartphone },
  { id: 'Credit/Debit Card', title: 'Cards', detail: 'Visa, Master, RuPay', icon: CreditCard },
  { id: 'Cash on Delivery', title: 'Cash', detail: 'Pay at your doorstep', icon: Wallet }
];

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [address, setAddress] = useState({
    street: '5/122, Vineet Khand, Gomti Nagar',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    zipCode: '226010',
    phone: '9876543210',
    landmark: 'Near City Mall'
  });

  const bill = useMemo(() => {
    const itemTotal = items.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
    const deliveryFee = itemTotal > 499 ? 0 : 29;
    const handlingFee = items.length > 0 ? 9 : 0;
    const taxes = Math.round(itemTotal * 0.05);
    return {
      itemTotal,
      deliveryFee,
      handlingFee,
      taxes,
      total: itemTotal + deliveryFee + handlingFee + taxes
    };
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen bg-[#FDFDFD] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-12 max-w-md text-center border border-slate-100 shadow-2xl"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
             <ShieldAlert className="w-10 h-10 text-slate-200" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 font-premium">Basket is Empty</h1>
          <p className="text-sm font-bold text-slate-400 mb-10 leading-relaxed">Add a few fresh essentials to your basket before proceeding to checkout.</p>
          <button 
            onClick={() => navigate('/products')} 
            className="w-full h-16 bg-slate-900 text-white rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-100"
          >
            Browse Products
          </button>
        </motion.div>
      </div>
    );
  }

  const validateAddress = () => {
    if (!address.street || !address.zipCode || !address.phone) {
      toast.error('Details incomplete');
      return false;
    }
    if (address.phone.replace(/\D/g, '').length < 10) {
      toast.error('Invalid phone number');
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    if (!validateAddress()) return;
    setProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const shouldFail = paymentMethod !== 'Cash on Delivery' && Math.random() < 0.05;
      if (shouldFail) throw new Error('Payment server timed out. Try COD.');

      let order = createLocalOrder({ items, address, paymentMethod, bill, user });

      if (user?.token) {
        try {
          const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/orders',
            {
              items: order.items.map(({ product, ...item }) => ({
                ...item,
                productId: product
              })),
              shippingAddress: address,
              address,
              paymentMethod,
              paymentStatus: order.paymentStatus,
              totalAmount: bill.total,
              bill
            },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          order = { ...order, ...data, orderId: data.orderId || order.orderId, bill, address, shippingAddress: address };
        } catch {
          toast('Saved locally (Backend down).');
        }
      }

      dispatch(addOrder(order));
      dispatch(clearCart());
      toast.success('Confirmed!', { style: { background: '#10B981', color: '#fff', borderRadius: '12px' } });
      navigate(`/orders/${order._id || order.orderId}`);
    } catch (error) {
      toast.error(error.message || 'Payment failed.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="pt-24 pb-28 min-h-screen bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <button 
              onClick={() => navigate('/cart')} 
              className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-emerald-500 shadow-sm transition-all hover:-translate-x-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 font-premium">Checkout</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" /> Secure 256-bit encrypted payment
              </p>
            </div>
          </motion.div>
          
          <div className="bg-white rounded-[20px] p-2 border border-slate-100 shadow-sm flex gap-2">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => i < step || (i === 2 && validateAddress()) ? setStep(i) : null}
                className={`w-12 h-12 rounded-xl text-xs font-black transition-all ${step === i ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 text-slate-300'}`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
          
          {/* Main Content Sections */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.section 
                  key="step1"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 rounded-[20px] bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-sm">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 font-premium tracking-tight">Delivery Hub</h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Gomti Nagar Fulfillment Center</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Home className="w-3 h-3" /> Address Detail
                      </label>
                      <input 
                        className="w-full h-16 bg-slate-50 border border-slate-100 rounded-[20px] px-6 font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                        value={address.street} 
                        onChange={(e) => setAddress({ ...address, street: e.target.value })} 
                        placeholder="House, Tower, Locality"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Pincode</label>
                      <input 
                        className="w-full h-16 bg-slate-50 border border-slate-100 rounded-[20px] px-6 font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all" 
                        value={address.zipCode} 
                        onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} 
                        placeholder="226010"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Phone className="w-3 h-3" /> Phone
                      </label>
                      <input 
                        className="w-full h-16 bg-slate-50 border border-slate-100 rounded-[20px] px-6 font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all" 
                        value={address.phone} 
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })} 
                        placeholder="9876543210"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nearest Landmark</label>
                      <input 
                        className="w-full h-16 bg-slate-50 border border-slate-100 rounded-[20px] px-6 font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all" 
                        value={address.landmark} 
                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })} 
                        placeholder="e.g. Near City Mall"
                      />
                    </div>
                  </div>
                </motion.section>
              )}

              {step === 2 && (
                <motion.section 
                  key="step2"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)]"
                >
                  <h2 className="text-2xl font-black text-slate-900 mb-8 font-premium">SKU Manifest</h2>
                  <div className="divide-y divide-slate-50">
                    {items.map((item) => (
                      <div key={item._id} className="py-6 flex items-center gap-6 group">
                        <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-900 text-lg leading-tight truncate">{item.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.quantity} Units • {item.weight || '500g'}</p>
                        </div>
                        <p className="font-black text-slate-900 text-xl tracking-tight">₹{(item.discountPrice || item.price) * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {step === 3 && (
                <motion.section 
                  key="step3"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)]"
                >
                  <h2 className="text-2xl font-black text-slate-900 mb-10 font-premium">Settlement Mode</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {paymentOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setPaymentMethod(option.id)}
                        className={`p-8 rounded-[2rem] border-2 text-left transition-all relative overflow-hidden group ${paymentMethod === option.id ? 'border-emerald-500 bg-emerald-50/50 shadow-xl shadow-emerald-500/5' : 'border-slate-50 bg-white hover:border-slate-200'}`}
                      >
                        <option.icon className={`w-8 h-8 mb-6 ${paymentMethod === option.id ? 'text-emerald-500' : 'text-slate-300 group-hover:text-slate-500'}`} />
                        <p className="font-black text-slate-900 text-sm uppercase tracking-widest leading-none mb-1">{option.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{option.detail}</p>
                        {paymentMethod === option.id && <div className="absolute top-4 right-4 text-emerald-500"><CheckCircle2 className="w-5 h-5" /></div>}
                      </button>
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          {/* Billing Sidebar */}
          <aside className="lg:sticky lg:top-28 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-slate-900 font-premium">Order Summary</h3>
                <ShieldCheck className="w-8 h-8 text-slate-100" />
              </div>
              
              <div className="space-y-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex justify-between"><span>Products total</span><span className="text-slate-900">₹{bill.itemTotal}</span></div>
                <div className="flex justify-between items-center">
                   <span>Fulfillment Fee</span>
                   <span className={bill.deliveryFee ? 'text-slate-900' : 'text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded'}>
                     {bill.deliveryFee ? `₹${bill.deliveryFee}` : 'FREE'}
                   </span>
                </div>
                <div className="flex justify-between"><span>Handling Charge</span><span className="text-slate-900">₹{bill.handlingFee}</span></div>
                <div className="flex justify-between"><span>GST & Taxes</span><span className="text-slate-900">₹{bill.taxes}</span></div>
                
                <div className="pt-8 border-t border-slate-50 flex justify-between items-end">
                  <div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] block mb-2">Total Payable</span>
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">₹{bill.total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-slate-50/50 border border-slate-50 rounded-[2rem] flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-500"><Zap className="w-5 h-5 fill-current" /></div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 leading-relaxed">Arriving in <br /> <span className="text-slate-900">10-12 minutes</span></p>
              </div>

              <button
                onClick={() => (step < 3 ? (step === 1 && !validateAddress() ? null : setStep(step + 1)) : placeOrder())}
                disabled={processing}
                className="mt-10 w-full py-6 bg-emerald-500 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-xl shadow-emerald-100 transition-all active:scale-95 disabled:opacity-50 group"
              >
                {processing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Transacting...</>
                ) : step < 3 ? (
                  <>Continue <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                ) : (
                  <>Place Order <CheckCircle2 className="w-5 h-5" /></>
                )}
              </button>
              
              <div className="mt-8 flex items-center justify-center gap-2">
                 <Lock className="w-3.5 h-3.5 text-slate-200" />
                 <p className="text-[9px] font-black text-slate-200 uppercase tracking-widest">End-to-End Encrypted</p>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const Lock = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default Checkout;
