import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Clock, ShieldCheck, ChevronLeft, Star, Heart, Share2, Plus, Minus, Zap } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { addToCart, updateCartQuantity, removeFromCart } from '../store/slices/cartSlice';
import { products as fallbackProducts } from '../data/shopData';
import { motion } from 'framer-motion';
import ProductCard from '../components/features/ProductCard';
import { handleComingSoon } from '../utils/ui';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const getImagePath = (img) => {
    if (!img) return '/assets/products/product-placeholder.png';
    // If it's already a relative path to assets, return as is
    if (img.startsWith('/assets/')) return img;
    // If it's an external URL
    if (img.startsWith('http')) return img;
    // Otherwise it might be a relative path from the server
    const API_URL = 'http://localhost:5001';
    return `${API_URL}${img}`;
  };

  const handleImageError = (e) => {
    e.target.src = '/assets/products/product-placeholder.png';
  };
  
  const { items } = useSelector((state) => state.cart);
  const cartItem = items.find(item => item._id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Supports both ID and Slug
        const { data } = await axios.get(`http://localhost:5001/api/products/${id}`);
        setProduct(data);
        
        // Fetch similar products from the same category
        const catId = data.category?._id || data.category;
        if (catId) {
          const simRes = await axios.get(`http://localhost:5001/api/products?category=${catId}&limit=5`);
          setSimilarProducts(simRes.data.products?.filter(p => p._id !== data._id).slice(0, 4) || []);
        }
      } catch (error) {
        const fallback = fallbackProducts.find(p => p._id === id || p.slug === id);
        if (fallback) {
          setProduct(fallback);
          const similar = fallbackProducts
            .filter(p => p.categorySlug === fallback.categorySlug && p._id !== fallback._id)
            .slice(0, 4);
          setSimilarProducts(similar);
        }
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
      style: { borderRadius: '12px', background: '#10B981', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
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
    <div className="pt-24 min-h-screen flex items-center justify-center bg-[#FAFAF9]">
       <div className="w-12 h-12 border-4 border-slate-100 border-t-[#7C3AED] rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="pt-24 min-h-screen flex flex-col items-center justify-center bg-[#FAFAF9]">
       <h1 className="text-2xl font-bold text-[#0F172A] mb-4 font-premium">Product Not Found</h1>
       <button onClick={() => navigate('/products')} className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest">Back to Shop</button>
    </div>
  );

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 overflow-visible">
           <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-full transition-all shadow-sm border border-slate-100">
             <ChevronLeft className="w-5 h-5 text-slate-400" />
           </button>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category?.name || product.category}</span>
           <span className="text-slate-200">/</span>
           <span className="text-[10px] font-bold text-[#0F172A] uppercase tracking-widest truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Image Section */}
          <div className="space-y-6">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="aspect-[4/3] bg-white rounded-[32px] p-12 border border-slate-100 relative group overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
             >
                {discountPercentage > 0 && (
                   <span className="absolute top-8 left-8 bg-[#7C3AED] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider z-10 shadow-lg shadow-violet-100">
                     {discountPercentage}% OFF
                   </span>
                )}
                <img 
                  src={getImagePath(product.image)} 
                  alt={product.name} 
                  onError={handleImageError}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-8 right-8 flex flex-col gap-3">
                   <button 
                     onClick={(e) => handleComingSoon(e, 'Wishlist')}
                     className="w-11 h-11 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all"
                   >
                      <Heart className="w-5 h-5" />
                   </button>
                   <button 
                     onClick={(e) => handleComingSoon(e, 'Sharing')}
                     className="w-11 h-11 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#7C3AED] shadow-sm transition-all"
                   >
                      <Share2 className="w-5 h-5" />
                   </button>
                </div>
             </motion.div>
          </div>

          {/* Right: Info Section */}
          <div className="flex flex-col gap-8">
             <div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-[11px]">{product.rating || '4.5'}</span>
                   </div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category?.name || product.category}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight mb-2 font-premium">{product.name}</h1>
                <p className="text-[#7C3AED] font-bold text-xs uppercase tracking-widest mb-6">{product.brand || 'ShopSphere Premium'}</p>
                
                <div className="flex items-center gap-4">
                   <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Net Weight</p>
                      <p className="text-sm font-bold text-[#0F172A]">{product.weight}</p>
                   </div>
                   <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Delivery</p>
                      <div className="flex items-center gap-1">
                         <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                         <p className="text-sm font-bold text-[#0F172A]">{product.deliveryTime || '10'} Mins</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-8">
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Selling Price</p>
                   <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-[#7C3AED] tracking-tight font-premium">₹{product.discountPrice || product.price}</span>
                      {product.discountPrice && (
                         <span className="text-lg text-slate-300 line-through font-bold">₹{product.price}</span>
                      )}
                   </div>
                </div>
                
                <div className="w-full sm:w-auto">
                   {quantity === 0 ? (
                      <button 
                        onClick={handleAddToCart}
                        className="w-full sm:w-56 h-14 bg-emerald-500 text-white rounded-xl font-black text-[13px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
                      >
                         <ShoppingBag className="w-5 h-5" /> Add to Basket
                      </button>
                   ) : (
                      <div className="w-full sm:w-56 flex items-center justify-between bg-emerald-500 text-white rounded-xl h-14 shadow-lg overflow-hidden">
                         <button 
                          onClick={() => handleUpdateQuantity(quantity - 1)}
                          className="w-14 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
                         ><Minus className="w-5 h-5" /></button>
                         <div className="text-center">
                            <span className="block font-bold text-sm leading-none">{quantity}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">In Basket</span>
                         </div>
                         <button 
                          onClick={() => handleUpdateQuantity(quantity + 1)}
                          className="w-14 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
                         ><Plus className="w-5 h-5" /></button>
                      </div>
                   )}
                </div>
             </div>

             <div className="space-y-8">
                <div className="space-y-4">
                   <h3 className="font-bold text-[#0F172A] text-xs uppercase tracking-widest border-b border-slate-100 pb-2">Description</h3>
                   <p className="text-slate-500 font-medium leading-relaxed text-sm">
                      {product.description || "Our premium quality products are sourced directly from farms and trusted vendors to ensure freshness and authenticity. Delivered within minutes, we guarantee the best service for your daily needs."}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <h3 className="font-bold text-[#0F172A] text-[10px] uppercase tracking-widest">Storage & Usage</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        {product.storageInfo || "Store in a cool, dry place away from direct sunlight."}
                      </p>
                   </div>
                   <div className="space-y-3">
                      <h3 className="font-bold text-[#0F172A] text-[10px] uppercase tracking-widest">Return Policy</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        {product.returnPolicy || "Standard return policy applies. Return within 24 hours if damaged."}
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-24">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#0F172A] font-premium">Similar Products</h2>
                <Link to={`/products?category=${product.categorySlug || product.category?.slug}`} className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest hover:underline">View All</Link>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {similarProducts.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
