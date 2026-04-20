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
        setCategories(data.length > 0 ? data : fallbackCategories);
      } catch (error) {
        setCategories(fallbackCategories);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-green-50 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-sm border border-green-100"
          >
            <Layers className="w-10 h-10 text-[var(--primary)]" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">All Categories</h1>
          <p className="text-base md:text-lg text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] max-w-2xl">Browse everything delivered in minutes</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {loading ? (
             Array(12).fill(0).map((_, i) => (
               <div key={i} className="aspect-square bg-white rounded-[2rem] animate-pulse border border-slate-100"></div>
             ))
          ) : (
             categories.map((cat, idx) => (
               <motion.div
                key={cat._id || cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
               >
                 <Link 
                  to={`/products?category=${cat.name}`} 
                  className="group flex flex-col items-center bg-white rounded-[2.5rem] p-6 border border-slate-100 hover:border-[var(--primary)] hover:shadow-2xl hover:shadow-green-50 transition-all relative overflow-hidden h-full"
                 >
                   <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[var(--primary)] opacity-0 group-hover:opacity-[0.03] blur-[40px] transition-opacity"></div>
                   
                   <div className="w-full aspect-square rounded-2xl flex items-center justify-center p-2 mb-4 bg-slate-50 group-hover:bg-white transition-colors" style={{ backgroundColor: cat.color }}>
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                      />
                   </div>
                   
                   <h3 className="font-black text-slate-900 text-xs text-center uppercase tracking-wider mb-1 group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                     {cat.name}
                   </h3>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-slate-600">
                     Explore <ChevronRight className="w-3 h-3" />
                   </p>
                 </Link>
               </motion.div>
             ))
          )}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--primary)] opacity-5 blur-[100px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Can't find what you're looking for?</h2>
            <p className="text-slate-400 font-medium mb-8 max-w-lg mx-auto">Our catalog is growing every day. Try searching for specific items or brands.</p>
            <Link to="/products" className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--primary)] text-white font-black rounded-2xl hover:bg-[var(--primary-dark)] transition-all shadow-xl shadow-green-900/20">
               <Search className="w-5 h-5" /> Search Products
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;
