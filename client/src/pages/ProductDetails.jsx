import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Clock, ShieldCheck, ChevronLeft, Star, Heart, Share2, Plus, Minus, Zap } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { addToCart, updateCartQuantity, removeFromCart } from '../store/slices/cartSlice';
import { products as fallbackProducts } from '../data/shopData';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { items } = useSelector((state) => state.cart);
  const cartItem = items.find(item => item._id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5001/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        const fallback = fallbackProducts.find(p => p._id === id);
        if (fallback) setProduct(fallback);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added!`, {
      style: { borderRadius: '12px', background: '#07142F', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });
  };

  const handleUpdateQuantity = (newQty) => {
    if (newQty === 0) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(updateCartQuantity({ id: product._id, quantity: newQty }));
    }
  };

  if (loading) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-slate-100 border-t-[var(--primary)] rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="pt-24 min-h-screen flex flex-col items-center justify-center">
       <h1 className="text-2xl font-black text-slate-900 mb-4">Product Not Found</h1>
       <button onClick={() => navigate('/products')} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest">Back to Shop</button>
    </div>
  );

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
           <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all">
             <ChevronLeft className="w-5 h-5 text-slate-400" />
           </button>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
           <span className="text-slate-200">/</span>
           <span className="text-xs font-black text-slate-900 uppercase tracking-widest truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Image Section */}
          <div className="space-y-6">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="aspect-square bg-slate-50 rounded-[3rem] p-12 border border-slate-100 relative group overflow-hidden"
             >
                {discountPercentage > 0 && (
                   <span className="absolute top-8 left-8 bg-[var(--primary)] text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest z-10 shadow-lg shadow-green-100">
                     Save {discountPercentage}%
                   </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute bottom-8 right-8 flex flex-col gap-3">
                   <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 shadow-xl shadow-slate-200 transition-all">
                      <Heart className="w-5 h-5" />
                   </button>
                   <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-[var(--primary)] shadow-xl shadow-slate-200 transition-all">
                      <Share2 className="w-5 h-5" />
                   </button>
                </div>
             </motion.div>
          </div>

          {/* Right: Info Section */}
          <div className="flex flex-col gap-8">
             <div>
                <div className="flex items-center gap-2 mb-4">
                   <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-black text-xs">{product.rating || '4.5'}</span>
                   </div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.numOfReviews || '120+'} Verified Reviews</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-4">{product.name}</h1>
                <p className="text-[var(--primary)] font-black text-sm uppercase tracking-[0.2em]">{product.brand}</p>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Unit Weight</p>
                   <p className="text-lg font-black text-slate-900">{product.weight}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Delivery ETA</p>
                   <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-500 fill-current" />
                      <p className="text-lg font-black text-slate-900">{product.deliveryTime || '8 Mins'}</p>
                   </div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price per unit</p>
                   <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black text-slate-900 tracking-tighter">₹{product.discountPrice || product.price}</span>
                      {product.discountPrice && (
                         <span className="text-xl text-slate-300 line-through font-bold">₹{product.price}</span>
                      )}
                   </div>
                </div>
                
                <div className="w-full md:w-auto">
                   {quantity === 0 ? (
                      <button 
                        onClick={handleAddToCart}
                        className="w-full md:w-64 py-5 bg-[var(--primary)] text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[var(--primary-dark)] transition-all shadow-xl shadow-green-100"
                      >
                         <ShoppingBag className="w-5 h-5" /> Add to Basket
                      </button>
                   ) : (
                      <div className="w-full md:w-64 flex items-center justify-between bg-slate-900 text-white rounded-2xl p-2 h-[68px] shadow-2xl">
                         <button 
                          onClick={() => handleUpdateQuantity(quantity - 1)}
                          className="w-14 h-full flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                         ><Minus className="w-5 h-5" /></button>
                         <div className="text-center">
                            <span className="block font-black text-lg leading-none">{quantity}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">In Basket</span>
                         </div>
                         <button 
                          onClick={() => handleUpdateQuantity(quantity + 1)}
                          className="w-14 h-full flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                         ><Plus className="w-5 h-5" /></button>
                      </div>
                   )}
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em]">Product Information</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">
                   {product.description || "Our premium quality products are sourced directly from farms and trusted vendors to ensure freshness and authenticity. Delivered within minutes, we guarantee the best service for your daily needs."}
                </p>
             </div>

             <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <ShieldCheck className="w-4 h-4 text-green-500" />
                   100% Quality Assurance
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <Zap className="w-4 h-4 text-green-500" />
                   Express Instant Delivery
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
