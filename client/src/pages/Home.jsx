import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, ChevronRight, Star, Zap, ArrowRight, Smartphone, RotateCcw } from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCardSkeleton, CategorySkeleton } from '../components/ui/Skeleton';
import ProductCard from '../components/features/ProductCard';
import CategoryCard from '../components/features/CategoryCard';

import { getCatalogProducts } from '../utils/commerceStorage';
import { handleComingSoon } from '../utils/ui';
import { products as fallbackProducts, categories as fallbackCategories } from '../data/shopData';

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

        const fetchedProducts = prodRes.status === 'fulfilled'
          ? (Array.isArray(prodRes.value.data.products) ? prodRes.value.data.products : (prodRes.value.data?.products || prodRes.value.data || []))
          : [];
        const rawCategories = catRes.status === 'fulfilled' ? catRes.value.data : [];

        const cleanFetchedProducts = fetchedProducts.filter(p => p.name && p.image);

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
            slug,
            image: (existing?.image && !cat.image?.startsWith('http')) ? existing.image : (cat.image || existing?.image),
            color: existing?.color || cat.color || '#F8FAF9'
          });
        });

        setProducts(cleanFetchedProducts.length > 0 ? cleanFetchedProducts : fallbackProducts.filter(p => p.isBestseller).slice(0, 12));
        setCategories(Array.from(uniqueCategoriesMap.values()));
      } catch {
        setProducts(getCatalogProducts().slice(0, 8));
        setCategories(fallbackCategories);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchData();
  }, []);

  const featureStrip = [
    { icon: Zap,         title: '8-min Delivery', text: 'Fastest in town'     },
    { icon: Star,        title: 'Quality Checked', text: 'Fresh essentials'   },
    { icon: ShoppingBag, title: 'Best Prices',     text: 'More savings'       },
    { icon: RotateCcw,   title: 'Easy Returns',    text: 'No questions asked' },
  ];

  return (
    <div className="w-full overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      {/* Subtle gradient bg so section doesn't merge with navbar */}
      <section
        className="w-full"
        style={{ background: 'linear-gradient(180deg, #F5FDF8 0%, #FFFFFF 100%)', paddingTop: '64px', paddingBottom: '0' }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center bg-white rounded-[40px] p-8 sm:p-12 lg:p-16 border border-slate-100 shadow-[0_8px_40px_rgb(0,0,0,0.03)] relative overflow-hidden group">

            {/* Soft glow – right side */}
            <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-br from-[#10B981]/6 to-transparent blur-[100px] pointer-events-none" />

            {/* Left: Copy */}
            <div className="relative z-10 flex flex-col justify-center">
              {/* Delivery badge — improved contrast & padding */}
              <div className="inline-flex items-center gap-[10px] bg-emerald-50 text-emerald-700 px-[14px] py-[7px] rounded-full text-[11px] font-black uppercase tracking-[0.18em] mb-[28px] border border-emerald-100 self-start shadow-sm">
                <Clock className="w-[13px] h-[13px] flex-shrink-0" />
                <span>Delivery in 10 minutes</span>
              </div>

              {/* H1 — prevent any line break inside words */}
              <h1
                className="font-black mb-[20px] leading-[0.95] font-premium tracking-[-0.04em] text-[#0F172A]"
                style={{
                  fontSize: 'clamp(42px, 6.5vw, 80px)',
                  wordBreak: 'keep-all',
                  overflowWrap: 'break-word',
                }}
              >
                Delivered in <br />
                <span className="text-[#10B981]">minutes.</span> <br />
                Designed for you.
              </h1>

              <p className="text-[17px] text-slate-500 mb-[36px] max-w-[480px] font-medium leading-relaxed">
                Experience the fastest grocery delivery in Gomti Nagar. Fresh essentials at your doorstep before you finish a call.
              </p>

              <div className="flex flex-wrap gap-[20px] items-center">
                <Link
                  to="/products"
                  className="h-[56px] px-[40px] bg-[#10B981] text-white rounded-[18px] font-black text-[13px] uppercase tracking-[0.12em] flex items-center justify-center hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 active:scale-95"
                >
                  Start Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <div className="flex items-center gap-[10px] text-slate-400 font-black text-[11px] uppercase tracking-widest">
                  <div className="w-[7px] h-[7px] rounded-full bg-[#10B981] animate-pulse" />
                  24/7 Support
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative z-10 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[480px] relative"
              >
                {/* Floating rating badge */}
                <div className="absolute -top-[20px] -right-[16px] bg-white px-[16px] py-[10px] rounded-[18px] shadow-2xl border border-slate-50 z-20 animate-float flex items-center gap-2">
                  <Star className="w-[14px] h-[14px] text-amber-500 fill-amber-500 flex-shrink-0" />
                  <span className="text-[12px] font-black text-slate-900 uppercase tracking-tighter whitespace-nowrap">4.9 / 5 Quality</span>
                </div>

                <div className="relative rounded-[36px] overflow-hidden shadow-[0_24px_56px_-12px_rgba(0,0,0,0.09)] border-[10px] border-white">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800"
                    alt="ShopSphere grocery delivery"
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE STRIP ────────────────────────────────────────────────── */}
      <section
        className="w-full"
        style={{ background: '#F3FAF7', paddingTop: '48px', paddingBottom: '48px' }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
            {featureStrip.map((f, i) => (
              <div
                key={i}
                className="flex flex-row items-center gap-[16px] bg-white rounded-[24px] px-[24px] py-[20px] border border-slate-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgb(0,0,0,0.06)]"
              >
                {/* Icon */}
                <div className="w-[52px] h-[52px] rounded-[16px] bg-emerald-50 text-[#10B981] flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-[26px] h-[26px]" strokeWidth={2} />
                </div>

                {/* Text — word-break prevents letter splitting */}
                <div style={{ minWidth: 0 }}>
                  <p
                    className="font-black text-[#0F172A] leading-snug mb-[2px]"
                    style={{ fontSize: '15px', wordBreak: 'keep-all', whiteSpace: 'normal', lineHeight: '1.4' }}
                  >
                    {f.title}
                  </p>
                  <p
                    className="font-bold text-slate-400 uppercase tracking-widest"
                    style={{ fontSize: '10px', wordBreak: 'keep-all', lineHeight: '1.5' }}
                  >
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────────────────── */}
      <section
        className="w-full"
        style={{ background: '#F8FAFC', paddingTop: '56px', paddingBottom: '56px' }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex justify-between items-end mb-[32px]">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-[4px]">
                Fresh essentials delivered in minutes
              </p>
            </div>
            <Link
              to="/categories"
              className="text-emerald-500 font-black text-[11px] uppercase tracking-[0.2em] hover:underline flex items-center gap-1 h-auto min-h-0 px-0 bg-transparent border-none shadow-none transition-all"
            >
              See All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="category-grid">
            {loading
              ? Array(10).fill(0).map((_, i) => <div key={i}><CategorySkeleton /></div>)
              : categories.map((cat) => (
                  <CategoryCard key={cat._id || cat.id} category={cat} />
                ))
            }
          </div>
        </div>
      </section>

      {/* ─── BESTSELLERS ──────────────────────────────────────────────────── */}
      <section
        className="w-full"
        style={{ background: '#FFFFFF', paddingTop: '56px', paddingBottom: '64px' }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex justify-between items-end mb-[32px]">
            <div>
              <h2 className="section-title">Bestsellers</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-[4px]">
                Most loved items right now
              </p>
            </div>
            <Link
              to="/products"
              className="text-emerald-500 font-black text-[11px] uppercase tracking-[0.2em] hover:underline h-auto min-h-0 px-0 bg-transparent border-none shadow-none"
            >
              View All
            </Link>
          </div>

          <div className="product-grid">
            {loading
              ? Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
              : products && products.length > 0
                ? products.slice(0, 12).map(product => <ProductCard key={product._id} product={product} />)
                : (
                  <div className="col-span-full py-16 text-center bg-white rounded-[3rem] border border-slate-50 text-slate-400 font-bold">
                    No products available
                  </div>
                )
            }
          </div>
        </div>
      </section>

      {/* ─── APP BANNER ───────────────────────────────────────────────────── */}
      <section
        className="w-full"
        style={{ background: '#F8FAFC', paddingTop: '0', paddingBottom: '72px' }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="bg-[#0F172A] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-[#10B981]/10 to-transparent blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-2.5 bg-[#10B981]/20 text-[#10B981] px-5 py-2 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-[#10B981]/20">
                <Smartphone className="w-4 h-4 flex-shrink-0" />
                Mobile App Available
              </div>
              <h2
                className="font-black text-white mb-6 leading-tight tracking-tighter font-premium"
                style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
              >
                Shop smarter <br /><span className="text-[#10B981]">on the go.</span>
              </h2>
              <p className="text-[17px] text-slate-400 mb-10 max-w-lg font-medium leading-relaxed">
                Track orders live, get exclusive app-only offers, and checkout in seconds. Experience the future of grocery shopping.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={(e) => handleComingSoon(e, 'App Store')}
                  className="h-14 px-8 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-xl"
                >
                  App Store
                </button>
                <button 
                  onClick={(e) => handleComingSoon(e, 'Play Store')}
                  className="h-14 px-8 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                >
                  Play Store
                </button>
              </div>
            </div>

            <div className="relative flex-1 max-w-sm w-full">
              <motion.div
                whileHover={{ y: -12 }}
                transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600"
                  className="w-full h-auto rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border-4 border-white/10 rotate-2"
                  alt="ShopSphere app preview"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
