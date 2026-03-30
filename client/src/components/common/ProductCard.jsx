import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Clock, Plus, Minus, Star } from 'lucide-react';
import { addToCart, updateCartQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  
  const cartItem = items.find(item => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added!`, {
      style: { borderRadius: '12px', background: '#07142F', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });
  };

  const handleUpdateQuantity = (e, newQty) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQty === 0) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(updateCartQuantity({ id: product._id, quantity: newQty }));
    }
  };

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="product-card bg-white rounded-3xl p-3 sm:p-4 border border-slate-100 flex flex-col h-full relative group cursor-pointer"
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 left-2 z-10">
           <span className="bg-[var(--primary)] text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
             {discountPercentage}% OFF
           </span>
        </div>
      )}

      {/* Image Area */}
      <Link to={`/product/${product._id}`} className="block aspect-square rounded-2xl bg-slate-50 overflow-hidden mb-4 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" 
          loading="lazy"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400'; }}
        />
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[9px] font-black text-slate-800 flex items-center gap-1 shadow-sm uppercase">
          <Clock className="w-3 h-3 text-[var(--primary)]" /> {product.deliveryTime || '12'} MINS
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-bold text-slate-400">{product.rating || '4.5'}</span>
        </div>

        <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2 leading-snug h-10">
          {product.name}
        </h3>
        
        <p className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-wider">
          {product.weight}
        </p>
        
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900 leading-none">₹{product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <span className="text-[10px] text-slate-400 line-through font-bold">₹{product.price}</span>
            )}
          </div>

          <div className="shrink-0">
            {quantity === 0 ? (
              <button 
                onClick={handleAddToCart}
                className="px-6 py-2 rounded-xl bg-white text-[var(--primary)] border-2 border-[var(--primary)] font-black text-[10px] uppercase tracking-widest hover:bg-[var(--primary)] hover:text-white transition-all"
              >
                ADD
              </button>
            ) : (
              <div className="flex items-center bg-[var(--primary)] text-white rounded-xl overflow-hidden shadow-lg shadow-green-100 h-9">
                <button 
                  onClick={(e) => handleUpdateQuantity(e, quantity - 1)}
                  className="w-8 h-full flex items-center justify-center hover:bg-black/10 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-black text-xs min-w-[20px] text-center">{quantity}</span>
                <button 
                  onClick={(e) => handleUpdateQuantity(e, quantity + 1)}
                  className="w-8 h-full flex items-center justify-center hover:bg-black/10 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
