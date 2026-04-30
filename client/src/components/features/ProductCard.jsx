import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Minus, Star, Clock } from 'lucide-react';
import { addToCart, updateCartQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { toast } from 'react-hot-toast';
import { formatCurrency } from '../../utils/format';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  
  const productId = product._id || product.id;
  const cartItem = productId ? items.find(item => (item._id || item.id) === productId) : null;
  const quantity = cartItem ? cartItem.quantity : 0;
  const API_URL = import.meta.env.VITE_API_URL + '';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added!`, {
      style: { borderRadius: '12px', background: '#10B981', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });
  };

  const handleUpdateQuantity = (e, newQty) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQty === 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartQuantity({ id: productId, quantity: newQty }));
    }
  };

  const discountPct = product?.discountPrice && product?.discountPrice < product?.price
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  const getImagePath = (img) => {
    if (!img) return '/assets/products/product-placeholder.png';
    // If it's already a relative path to assets, return as is
    if (img.startsWith('/assets/')) return img;
    // If it's an external URL
    if (img.startsWith('http')) return img;
    // Otherwise it might be a relative path from the server
    const API_URL = import.meta.env.VITE_API_URL + '';
    return `${API_URL}${img}`;
  };

  const handleImageError = (e) => {
    // Strict placeholder as requested
    e.target.src = '/assets/products/product-placeholder.png';
    console.warn(`Missing product image for: ${product.name}`);
  };


  return (
    <div className="group bg-white rounded-2xl border border-slate-100 hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      
      {/* ─── TOP SECTION: IMAGE & BADGES ─────────────────────────────────── */}
      <Link to={`/product/${product._id}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-50/30">
        {/* Badges - Top Left */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5">
          {discountPct > 0 && (
            <div className="bg-[#E11D48] text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase shadow-lg tracking-tighter">
              {discountPct}% OFF
            </div>
          )}
          {product.isBestseller && (
            <div className="bg-amber-400 text-slate-900 text-[9px] font-black px-2 py-1 rounded-lg uppercase shadow-lg tracking-tighter">
              Bestseller
            </div>
          )}
        </div>

        {/* Product Image - Full Width & Centered */}
        <div className="w-full h-full flex items-center justify-center p-4 transition-all duration-500 group-hover:p-2">
          <img 
            src={getImagePath(product.image)} 
            alt={product.name} 
            className="w-full h-full object-contain drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-110" 
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        {/* Delivery Time - Overlay */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 px-2 py-1 rounded-lg flex items-center gap-1.5 z-10 transition-all group-hover:translate-y-[-4px]">
          <Clock className="w-3 h-3 text-emerald-500" />
          <span className="text-[9px] font-black text-slate-800 uppercase tracking-tighter">{product.deliveryTime || '10'} MINS</span>
        </div>
      </Link>

      {/* ─── CONTENT AREA ───────────────────────────────────────────────── */}
      <div className="flex flex-col flex-grow px-4 pb-4">
        
        {/* Rating & Brand Row */}
        <div className="flex items-center justify-between mb-2">
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.15em] line-clamp-1 max-w-[60%]">{product.brand || 'ShopSphere'}</span>
           <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded-md">
             <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
             <span className="text-[9px] font-bold text-amber-700">{product.rating || '4.5'}</span>
           </div>
        </div>

        {/* Product Name & Quantity */}
        <div className="mb-4">
          <h3 className="text-[13px] font-black text-slate-900 leading-[1.3] mb-1 line-clamp-2 min-h-[2.6em] tracking-tight">
            {product.name}
          </h3>
          <p className="text-[11px] font-bold text-slate-400">{product.weight || '1 unit'}</p>
        </div>

        {/* ─── FOOTER: PRICE & CTA ───────────────────────────────────────── */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[18px] font-black text-[#0F172A] tracking-tighter leading-none mb-1">
              {formatCurrency(product.discountPrice || product.price)}
            </span>
            {product.discountPrice && (
              <span className="text-[12px] text-slate-400 line-through font-bold leading-none">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <div className="shrink-0">
            {quantity === 0 ? (
              <button 
                onClick={handleAddToCart}
                className="h-10 px-5 bg-[#10B981] text-white rounded-[14px] font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-100 flex items-center gap-1.5 border border-emerald-400/20"
              >
                ADD <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            ) : (
              <div className="flex items-center bg-[#10B981] text-white rounded-[14px] overflow-hidden h-10 min-w-[90px] shadow-lg shadow-emerald-100 border border-emerald-400/20">
                <button 
                  onClick={(e) => handleUpdateQuantity(e, quantity - 1)}
                  className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-all border-r border-emerald-400/30"
                >
                  <Minus className="w-4 h-4 stroke-[3]" />
                </button>
                <span className="font-black text-[14px] min-w-[28px] text-center">{quantity}</span>
                <button 
                  onClick={(e) => handleUpdateQuantity(e, quantity + 1)}
                  className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-all border-l border-emerald-400/30"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
