import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, ChevronRight, Star, Zap, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCardSkeleton, CategorySkeleton } from '../components/common/Skeleton';
import ProductCard from '../components/common/ProductCard';
import CategoryCard from '../components/common/CategoryCard';
import EmptyState from '../components/common/EmptyState';

import { categories as fallbackCategories, products as fallbackProducts, getBestsellers } from '../data/shopData';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { items } = useSelector((state) => state.cart);

  const API_URL = 'http://localhost:5001/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.allSettled([
          axios.get(`${API_URL}/products?limit=12&sort=-rating`),
          axios.get(`${API_URL}/categories`)
        ]);
        
        const fetchedProducts = prodRes.status === 'fulfilled' ? (Array.isArray(prodRes.value.data.products) ? prodRes.value.data.products : prodRes.value.data) : [];
        const fetchedCategories = catRes.status === 'fulfilled' ? catRes.value.data : [];

        setProducts(fetchedProducts.length > 0 ? fetchedProducts : fallbackProducts.slice(0, 8));
        setCategories(fetchedCategories.length > 0 ? fetchedCategories : fallbackCategories);
      } catch (error) {
        setProducts(fallbackProducts.slice(0, 8));
        setCategories(fallbackCategories);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchData();
  }, []);

  const featureStrip = [
    { icon: Zap, title: '8-min Delivery', text: 'Fastest in town' },
    { icon: Star, title: 'Quality Checked', text: 'Fresh essentials' },
    { icon: ShoppingBag, title: 'Best Prices', text: 'More savings' },
    { icon: Clock, title: 'Easy Returns', text: 'No questions asked' }
  ];

  return (
    <div className="w-full pb-20">
      {/* Hero Section - Compact & Premium */}
      <section className="pt-6 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm overflow-hidden relative">
           {/* Decorative blur */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-green-50 opacity-50 blur-[100px] -z-0"></div>

           <div className="flex-1 text-left z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 font-black text-[10px] uppercase tracking-widest mb-6 border border-green-100">
                  <Zap className="w-3.5 h-3.5 fill-green-600" />
                  Instant Delivery in 8 minutes
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tighter">
                  Groceries <br /> Delivered <span className="text-[var(--primary)]">Instantly.</span>
                </h1>
                <p className="text-lg text-slate-500 mb-10 max-w-lg font-medium leading-relaxed">
                  Fresh fruits, dairy, snacks and home essentials delivered to your doorstep in the blink of an eye.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/products" className="px-10 py-4.5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center gap-3">
                    Start Shopping <ChevronRight className="w-5 h-5" />
                  </Link>
                  <button className="px-8 py-4.5 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
                    View Offers
                  </button>
                </div>
              </motion.div>
           </div>

           <div className="flex-1 relative z-10 w-full max-w-[500px]">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" 
                  alt="Quick Commerce" 
                  className="w-full h-auto rounded-[2.5rem] shadow-2xl rotate-2"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-[2rem] shadow-2xl border border-slate-50 flex items-center gap-4 animate-bounce-subtle">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Arriving in</p>
                    <p className="text-lg font-black text-slate-900">8 Mins</p>
                  </div>
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Feature Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {featureStrip.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                <f.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm">{f.title}</p>
                <p className="text-xs text-slate-400 font-medium">{f.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Grid - Blinkit Style */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Everything you need, delivered fast</p>
            </div>
            <Link to="/categories" className="text-[var(--primary)] font-black text-xs uppercase tracking-widest hover:underline">See All</Link>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 md:gap-6">
            {loading ? (
              Array(18).fill(0).map((_, i) => <CategorySkeleton key={i} />)
            ) : (
              categories.map((cat) => (
                <Link key={cat._id || cat.id} to={`/products?category=${cat.name}`} className="flex flex-col items-center group">
                  <div className={`w-full aspect-square rounded-3xl flex items-center justify-center p-4 transition-all group-hover:shadow-lg group-hover:-translate-y-1 mb-3`} style={{ backgroundColor: cat.color || '#f8fafc' }}>
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 text-center leading-tight group-hover:text-slate-900">{cat.name}</span>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Dynamic Product Sections */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bestsellers</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Most loved items right now</p>
            </div>
            <Link to="/products" className="text-[var(--primary)] font-black text-xs uppercase tracking-widest hover:underline">See All</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {loading ? (
              Array(4).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
            ) : (
              products.map(product => <ProductCard key={product._id} product={product} />)
            )}
          </div>
        </section>

        {/* Promo Banners */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Fresh Deals</p>
              <h3 className="text-2xl font-black mb-6">Everything <br /> under ₹99</h3>
              <button className="px-6 py-2.5 bg-white text-green-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-50 transition-all">Shop Now</button>
            </div>
            <ShoppingBag className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform" />
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">New User Offer</p>
              <h3 className="text-2xl font-black mb-6">Get ₹200 off <br /> first order</h3>
              <button className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">Claim Now</button>
            </div>
            <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform" />
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Kitchen Essentials</p>
              <h3 className="text-2xl font-black mb-6">Up to 40% <br /> off on Atta & Dal</h3>
              <button className="px-6 py-2.5 bg-white text-amber-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-50 transition-all">View All</button>
            </div>
            <Star className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform" />
          </div>
        </section>

        {/* Fresh Fruits Section */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Fresh Fruits & Veggies</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Farm fresh goodness delivered</p>
            </div>
            <Link to="/products?category=Fruits & Vegetables" className="text-[var(--primary)] font-black text-xs uppercase tracking-widest hover:underline">See All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {fallbackProducts.filter(p => p.category === 'Fruits & Vegetables').slice(0, 4).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        {/* App Section */}
        <section className="mb-20">
          <div className="bg-slate-900 rounded-[4rem] p-10 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[var(--primary)] opacity-10 blur-[150px]"></div>
            <div className="flex-1 relative z-10 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">Shop smarter <br /><span className="text-[var(--primary)]">on the go.</span></h2>
              <p className="text-slate-400 text-lg mb-10 font-medium max-w-lg">Track orders live, get app-only offers, and checkout faster with the ShopSphere app.</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">App Store</button>
                <button className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all">Play Store</button>
              </div>
            </div>
            <div className="flex-1 relative z-10">
              <div className="w-full max-w-[400px] aspect-[4/5] bg-slate-800 rounded-[3rem] border-8 border-slate-700 shadow-2xl relative overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600" className="w-full h-full object-cover opacity-50" alt="App Preview" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-[var(--primary)] flex items-center justify-center text-white shadow-2xl">
                       <Zap className="w-10 h-10 fill-white" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
