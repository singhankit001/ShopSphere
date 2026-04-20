import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import EmptyState from '../components/common/EmptyState';
import { ProductCardSkeleton } from '../components/common/Skeleton';
import ProductCard from '../components/common/ProductCard';

import { categories as fallbackCategories, products as fallbackProducts } from '../data/shopData';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const cat = params.get('category');
    const q = params.get('search');
    if (cat) setActiveCategory(cat);
    if (q) setSearchQuery(q);
  }, [search]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/categories');
        setCategories([{ name: 'All', slug: 'all' }, ...data]);
      } catch (error) {
        setCategories(fallbackCategories);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const baseUrl = 'http://localhost:5001/api/products';
        const params = new URLSearchParams();
        params.set('page', page);
        params.set('limit', 12);
        if (activeCategory !== 'All') params.set('category', activeCategory);
        if (searchQuery) params.set('search', searchQuery);
        
        const { data } = await axios.get(`${baseUrl}?${params.toString()}`);
        
        const normalizedProducts = Array.isArray(data.products) ? data.products : (Array.isArray(data) ? data : []);
        
        if (normalizedProducts.length > 0) {
          setProducts(normalizedProducts);
          setTotalPages(data.pages || 1);
        } else {
          // If search/category returns nothing from API, use fallback filter
          let filtered = activeCategory === 'All' ? fallbackProducts : fallbackProducts.filter(p => p.category === activeCategory);
          if (searchQuery) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
          }
          setProducts(filtered);
          setTotalPages(1);
        }
      } catch (error) {
        let filtered = activeCategory === 'All' ? fallbackProducts : fallbackProducts.filter(p => p.category === activeCategory);
        setProducts(filtered);
        setTotalPages(1);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchProducts();
  }, [activeCategory, searchQuery, page]);

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col gap-8 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {activeCategory === 'All' ? 'Shop All Products' : activeCategory}
              </h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">
                Found {products.length} items in this collection
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <div className="relative flex-1 md:w-64">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                  type="text" 
                  placeholder="Search in results..." 
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold outline-none focus:border-[var(--primary)] transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
               <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                 <Filter className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id || cat.slug}
                onClick={() => { setActiveCategory(cat.name); setPage(1); }}
                className={`px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all whitespace-nowrap border ${
                  activeCategory === cat.name 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-[var(--primary)] hover:text-[var(--primary)]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {loading ? (
             Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : products.length > 0 ? (
             products.map(product => (
               <ProductCard key={product._id} product={product} />
             ))
          ) : (
             <div className="col-span-full">
                <EmptyState 
                  icon={Search}
                  title="No results found"
                  description="We couldn't find anything matching your filters. Try a different category or search term."
                  buttonText="Clear All Filters"
                  onButtonClick={() => { setActiveCategory('All'); setSearchQuery(''); navigate('/products'); }}
                />
             </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
             <button 
              disabled={page === 1}
              onClick={() => { setPage(p => p - 1); window.scrollTo(0, 0); }}
              className="p-4 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-30 transition-all shadow-sm hover:border-[var(--primary)]"
             >
               Previous
             </button>
             <div className="px-6 py-4 bg-white border border-slate-200 rounded-xl font-black text-xs text-slate-900 shadow-sm">
               Page {page} of {totalPages}
             </div>
             <button 
              disabled={page === totalPages}
              onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0); }}
              className="p-4 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-30 transition-all shadow-sm hover:border-[var(--primary)]"
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
