import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search, Zap } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import EmptyState from '../components/common/EmptyState';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import ProductCard from '../components/features/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

import { categories as fallbackCategories, products as fallbackProducts } from '../data/shopData';
import { getCatalogProducts } from '../utils/commerceStorage';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const cat = params.get('category') || 'all';
    const q = params.get('search') || '';
    const p = params.get('page') || '1';
    
    setActiveCategory(cat);
    setSearchQuery(q);
    setPage(parseInt(p));
  }, [search]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_API_URL + '/categories');
        const rawCategories = data || [];
        const uniqueCategoriesMap = new Map();
        
        fallbackCategories.forEach(cat => {
          uniqueCategoriesMap.set(cat.slug, { ...cat });
        });

        rawCategories.forEach(cat => {
          const slug = cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-');
          if (!slug) return;
          const existing = uniqueCategoriesMap.get(slug);
          uniqueCategoriesMap.set(slug, {
            ...existing,
            ...cat,
            slug
          });
        });
          
        setCategories([{ name: 'All', slug: 'all' }, ...Array.from(uniqueCategoriesMap.values())]);
      } catch (error) {
        setCategories([{ name: 'All', slug: 'all' }, ...fallbackCategories]);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // 1. ALWAYS READ FRESH PARAMS FROM URL
        const params = new URLSearchParams(search);
        const urlCategory = params.get('category') || 'all';
        const urlSearch = params.get('search') || '';
        const urlPage = parseInt(params.get('page') || '1');

        // Update local state for UI sync
        setActiveCategory(urlCategory);
        setSearchQuery(urlSearch);
        setPage(urlPage);

        const activeSlug = urlCategory;
        const baseUrl = import.meta.env.VITE_API_URL + '/products';
        const apiParams = new URLSearchParams();
        apiParams.set('page', urlPage);
        apiParams.set('limit', 20);
        
        if (activeSlug !== 'all') {
          apiParams.set('category', activeSlug);
        }
        if (urlSearch) apiParams.set('search', urlSearch);
        
        let fetchedData = { products: [], pages: 1 };
        try {
          const { data } = await axios.get(`${baseUrl}?${apiParams.toString()}`);
          fetchedData = data;
        } catch (e) {
          console.log("API Error, falling back to local data");
        }

        const rawProducts = Array.isArray(fetchedData.products) ? fetchedData.products : (Array.isArray(fetchedData) ? fetchedData : []);
        const normalizedProducts = rawProducts.map(p => ({
          ...p,
          _id: p._id || p.id || `gen-${Math.random().toString(36).slice(2, 9)}`,
          categorySlug: p.categorySlug || (p.category && p.category.slug) || (typeof p.category === 'string' ? p.category : null)
        }));
        
        // 2. APPLY STRICT FRONTEND FILTERING (Double validation)
        let finalProducts = normalizedProducts;
        if (activeSlug && activeSlug !== 'all') {
          finalProducts = finalProducts.filter(p => {
            // Case-insensitive comparison just in case
            return String(p.categorySlug).toLowerCase() === String(activeSlug).toLowerCase();
          });
        }

        if (finalProducts.length > 0) {
          setProducts(finalProducts);
          setTotalPages(fetchedData.pages || 1);
        } else {
          // fallback to catalog data if API returns nothing or wrong items
          let filteredFallback = activeSlug === 'all' 
            ? getCatalogProducts() 
            : getCatalogProducts().filter(p => {
                const pSlug = p.categorySlug || (p.category && p.category.slug) || (typeof p.category === 'string' ? p.category : null);
                return String(pSlug).toLowerCase() === String(activeSlug).toLowerCase();
              });

          if (urlSearch) {
            filteredFallback = filteredFallback.filter(p => p.name.toLowerCase().includes(urlSearch.toLowerCase()));
          }

          setProducts(filteredFallback);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Critical error in fetchProducts:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchProducts();
  }, [search]); // ONLY depend on search (URL change)

  const getCategoryTheme = () => {
    const themes = {
      'fruits-vegetables': { color: 'from-green-400 to-emerald-600', icon: '🍎' },
      'dairy-bread-eggs': { color: 'from-orange-300 to-amber-500', icon: '🥛' },
      'snacks-munchies': { color: 'from-yellow-400 to-orange-500', icon: '🍿' },
      'cold-drinks-juices': { color: 'from-blue-400 to-indigo-600', icon: '🥤' },
      'instant-food': { color: 'from-red-400 to-pink-600', icon: '🍜' },
      'tea-coffee-more': { color: 'from-amber-600 to-brown-800', icon: '☕' },
      'bakery-biscuits': { color: 'from-yellow-600 to-amber-700', icon: '🍞' },
      'sweet-tooth': { color: 'from-pink-400 to-rose-600', icon: '🍰' },
      'atta-rice-dal': { color: 'from-amber-200 to-yellow-500', icon: '🌾' },
      'oil-ghee-masala': { color: 'from-yellow-500 to-orange-700', icon: '🥘' },
      'personal-care': { color: 'from-cyan-400 to-blue-600', icon: '🧴' },
      'baby-care': { color: 'from-purple-300 to-indigo-500', icon: '👶' },
      'household-essentials': { color: 'from-slate-400 to-slate-600', icon: '🏠' },
      'cleaning-needs': { color: 'from-sky-400 to-blue-500', icon: '🧹' },
      'pet-care': { color: 'from-orange-400 to-amber-600', icon: '🐶' },
      'electronics': { color: 'from-slate-700 to-slate-900', icon: '🔌' },
      'beauty-grooming': { color: 'from-rose-400 to-pink-500', icon: '💄' },
      'health-wellness': { color: 'from-emerald-400 to-green-600', icon: '🏥' },
      'default': { color: 'from-slate-700 to-slate-900', icon: '📦' }
    };
    return themes[activeCategory] || themes.default;
  };

  const theme = getCategoryTheme();

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      
      {/* Category Hero Banner */}
      <section className={`w-full !py-[80px] lg:!py-[96px] bg-gradient-to-br ${theme.color} relative overflow-hidden`}>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/4"></div>
         <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-center justify-between gap-[64px]"
            >
               <div className="max-w-[640px] text-center md:text-left">
                  <div className="inline-flex items-center gap-[12px] bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] mb-[32px] px-[16px] py-[8px]">
                     <Zap className="w-3.5 h-3.5 fill-current" /> Fresh essentials delivered in minutes
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] font-premium mb-[24px]">
                    {activeCategory === 'all' ? 'Everything you need' : categories.find(c => c.slug === activeCategory)?.name || activeCategory}
                  </h1>
                  <p className="text-white/80 text-lg lg:text-xl font-bold max-w-[480px] leading-relaxed">
                    Premium quality products sourced fresh daily. Get your {activeCategory === 'all' ? 'groceries' : (categories.find(c => c.slug === activeCategory)?.name || activeCategory).toLowerCase()} delivered to your doorstep in minutes.
                  </p>
               </div>
               <div className="hidden lg:flex items-center justify-center w-[320px] h-[320px] bg-white/10 backdrop-blur-xl rounded-[40px] border border-white/20 relative group">
                  <div className="text-[140px] leading-none drop-shadow-2xl animate-float group-hover:scale-110 transition-transform">
                    {theme.icon}
                  </div>
                  <div className="absolute -bottom-[24px] -right-[24px] w-[128px] h-[128px] bg-white rounded-full flex items-center justify-center shadow-2xl rotate-12">
                     <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-tight text-center">Fresh <br /> Guaranteed</p>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      <div className="container relative z-10 -mt-10">
        
        {/* Controls Bar */}
        <div className="bg-white !p-[24px] rounded-[32px] shadow-xl shadow-slate-200/40 border border-slate-100 mb-[64px] flex flex-col lg:flex-row items-center justify-between gap-[32px]">
           <div className="flex items-center gap-[12px] overflow-x-auto no-scrollbar w-full lg:w-auto py-1">
              {categories.map((cat) => (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => { 
                    navigate(`/products?category=${cat.slug}`);
                    setPage(1); 
                  }}
                  className={`px-[24px] h-[56px] rounded-[16px] font-black text-[11px] uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                    activeCategory === cat.slug 
                    ? 'bg-[#10B981] text-white border-[#10B981] shadow-lg shadow-green-100' 
                    : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200 hover:text-slate-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
           </div>

           <div className="w-full lg:w-[384px] search-wrapper">
              <Search className="search-icon-global" />
              <input 
                type="text" 
                placeholder="Search in category..." 
                className="search-input-global"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px] overflow-visible"
        >
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
            ) : products.length > 0 ? (
              products.map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-40 bg-white rounded-[4rem] border border-slate-100 shadow-sm text-center">
                 <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Search className="w-12 h-12 text-slate-200" />
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight font-premium">No results found</h3>
                 <button 
                   onClick={() => { navigate('/products'); }}
                   className="h-16 px-12 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95"
                 >
                   Clear Filters
                 </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-24">
             <button 
              disabled={page === 1}
              onClick={() => { 
                const newPage = page - 1;
                navigate(`/products?category=${activeCategory}&page=${newPage}${searchQuery ? `&search=${searchQuery}` : ''}`);
              }}
              className="h-16 px-8 bg-white border border-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-widest disabled:opacity-30 transition-all shadow-sm hover:border-[var(--primary)] active:scale-95"
             >
               Previous
             </button>
             <div className="h-16 flex items-center px-8 bg-slate-50 border border-slate-100 rounded-2xl font-black text-xs text-slate-900">
               Page {page} of {totalPages}
             </div>
             <button 
              disabled={page === totalPages}
              onClick={() => { 
                const newPage = page + 1;
                navigate(`/products?category=${activeCategory}&page=${newPage}${searchQuery ? `&search=${searchQuery}` : ''}`);
              }}
              className="h-16 px-8 bg-white border border-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-widest disabled:opacity-30 transition-all shadow-sm hover:border-[var(--primary)] active:scale-95"
             >
               Next
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
