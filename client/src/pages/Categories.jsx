import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ChevronRight, Search } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { categories as fallbackCategories } from '../data/shopData';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/categories');
        
        const rawCategories = data || [];
        
        const uniqueCategoriesMap = new Map();
        
        // 1. Establish base with fallbacks (contains the premium Unsplash images)
        fallbackCategories.forEach(cat => {
          uniqueCategoriesMap.set(cat.slug, { ...cat });
        });

        // 2. Merge with backend
        rawCategories.forEach(cat => {
          const slug = cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-');
          if (!slug) return;
          
          const existing = uniqueCategoriesMap.get(slug);
          uniqueCategoriesMap.set(slug, {
            ...existing,
            ...cat,
            slug,
            image: (existing?.image && !cat.image?.startsWith('http')) ? existing.image : (cat.image || existing?.image),
            color: existing?.color || cat.color || '#F8F9FA'
          });
        });
          
        setCategories(Array.from(uniqueCategoriesMap.values()));
      } catch (error) {
        setCategories(fallbackCategories);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchCategories();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-24 min-h-screen bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container relative z-10 overflow-visible">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-[80px] overflow-visible">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[80px] h-[80px] bg-emerald-50 rounded-[28px] flex items-center justify-center mb-[32px] shadow-sm border border-emerald-100/50"
          >
            <Layers className="w-[36px] h-[36px] text-[#10B981]" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-[24px] font-premium overflow-visible whitespace-normal leading-[1.05]">
            Shop by <span className="text-[#10B981] font-premium">Category</span>
          </h1>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[11px] max-w-[640px] overflow-visible">Discover thousands of items delivered in 10 minutes</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[24px] overflow-visible">
          {loading ? (
             Array(18).fill(0).map((_, i) => (
               <div key={i} className="h-[220px] bg-slate-50 rounded-[32px] animate-pulse shimmer"></div>
             ))
          ) : (
             categories.map((cat, idx) => (
               <motion.div
                key={cat._id || cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="overflow-visible"
               >
                 <Link 
                  to={`/products?category=${cat.slug}`} 
                  className="group flex flex-col items-center p-6 bg-white rounded-[36px] border border-slate-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_56px_rgba(0,0,0,0.08)] hover:border-emerald-100"
                 >
                   {/* Image Area — Circular with premium fitting */}
                   <div 
                    className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm transition-transform duration-700 group-hover:scale-110 overflow-hidden"
                    style={{ backgroundColor: cat.color || '#F8F9FA' }}
                   >
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400'; }}
                      />
                   </div>
                   
                   {/* Content Area */}
                   <div className="text-center">
                     <h3 className="text-[15px] font-black text-slate-900 mb-1 group-hover:text-emerald-500 transition-colors leading-tight tracking-tight font-premium">
                       {cat.name}
                     </h3>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat.description || 'Premium Collection'}</p>
                   </div>
                 </Link>
               </motion.div>
             ))
          )}
        </div>

        {/* Bottom Banner */}
        <div className="mt-[120px] bg-slate-900 rounded-[4rem] p-[80px] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/10 blur-[120px] pointer-events-none"></div>
          <div className="relative z-10 overflow-visible">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-[24px] tracking-tight font-premium leading-tight">Can't find an item?</h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium mb-[48px] max-w-[640px] mx-auto leading-relaxed">Our catalog is growing every hour. Search the full store or contact us for requests.</p>
            <div className="flex justify-center">
              <Link to="/products" className="h-[64px] px-[40px] bg-white text-slate-900 font-black rounded-[24px] hover:bg-slate-50 transition-all shadow-xl text-[12px] uppercase tracking-widest flex items-center justify-center active:scale-95 group">
                 <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform text-emerald-500" /> Search Full Store
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;
