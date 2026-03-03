import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowLeft,
  Star,
  RefreshCw,
  Gem
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '10K+', icon: Users, color: 'text-blue-500' },
    { label: 'Avg. Delivery', value: '8 Mins', icon: Clock, color: 'text-[#10B981]' },
    { label: 'Products', value: '500+', icon: ShoppingBag, color: 'text-orange-500' },
    { label: 'Support', value: '24/7', icon: ShieldCheck, color: 'text-purple-500' }
  ];

  const values = [
    { 
      title: 'Fast Delivery', 
      desc: 'Our ultra-fast logistics network ensures your essentials reach you in under 10 minutes.', 
      icon: Zap 
    },
    { 
      title: 'Fresh Quality', 
      desc: 'We partner directly with farmers and brands to bring you the freshest produce and genuine products.', 
      icon: Star 
    },
    { 
      title: 'Best Prices', 
      desc: 'Smart sourcing and efficient operations allow us to offer the most competitive prices in the market.', 
      icon: Gem 
    },
    { 
      title: 'Easy Returns', 
      desc: 'Not satisfied? Our "No Questions Asked" return policy makes shopping completely worry-free.', 
      icon: RefreshCw 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-[-12deg] translate-x-20 hidden lg:block"></div>
        <div className="container relative z-10 px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-[#10B981] text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-green-100"
              >
                <Zap className="w-3.5 h-3.5 fill-current" /> Instant commerce, reimagined
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter font-premium mb-8"
              >
                Delivering everyday <br />
                <span className="text-[#10B981]">essentials in minutes.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-lg lg:text-xl font-medium leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              >
                ShopSphere is building the future of quick commerce in India. We're on a mission to save you time and effort by bringing the entire store to your doorstep instantly.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <Link to="/products" className="h-16 px-10 bg-[#10B981] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0E9F6E] transition-all shadow-xl shadow-green-100 active:scale-95 flex items-center">
                  Start Shopping
                </Link>
                <Link to="/categories" className="h-16 px-10 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 flex items-center">
                  Explore Categories
                </Link>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex-1 w-full max-w-xl"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-[#10B981]/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800" 
                  alt="Delivery Illustration"
                  className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl border-8 border-white group-hover:rotate-1 transition-transform"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 py-20 lg:py-24 border-y border-slate-100">
        <div className="container px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="card-global !p-10 text-center"
              >
                <div className={`card-icon-wrap bg-slate-50 mx-auto mb-8 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tighter">{stat.value}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800" 
                  className="w-full h-[500px] object-cover rounded-[4rem] shadow-2xl"
                  alt="Our Story"
                />
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#10B981] rounded-full flex items-center justify-center text-white text-center p-6 shadow-2xl rotate-12">
                   <p className="text-sm font-black uppercase tracking-widest leading-tight">Since 2024 <br /> Growing Fast</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tighter font-premium">Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  ShopSphere started with a simple observation: life is busy, and grocery shopping shouldn't be a chore that takes hours. We saw a gap in the market for a truly instant delivery service that didn't compromise on quality or price.
                </p>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  Today, we are building a network of localized 'Dark Stores' that allow us to reach your doorstep in minutes. Our technology-driven approach ensures that from the moment you tap 'Order', every second counts.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {['Fast grocery delivery', 'Fresh essentials', 'Reliable service', 'Affordable pricing'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-[#10B981] shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[14px] font-black text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="bg-[#0F172A] rounded-[4rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-[#10B981]/15 to-transparent blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tighter font-premium">What we stand for</h2>
              <p className="text-slate-400 text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Our core values drive every decision we make, from the products we stock to the riders we partner with daily.
              </p>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {values.map((v, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -12 }}
                  className="card-global-dark !p-10 text-center lg:text-left"
                >
                  <div className="card-icon-wrap bg-[#10B981] text-white mb-8 shadow-xl shadow-green-900/20 mx-auto lg:mx-0">
                    <v.icon className="w-9 h-9" />
                  </div>
                  <h4 className="card-title-global !text-white !text-2xl !mb-4">{v.title}</h4>
                  <p className="card-desc-global !text-slate-400">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 lg:py-32 bg-slate-50 border-t border-slate-100 pb-40">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto mb-24">
             <h2 className="text-4xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter font-premium">Why customers <br /> <span className="text-[#10B981]">trust ShopSphere</span></h2>
             <p className="text-slate-500 text-lg lg:text-xl font-medium leading-relaxed">We combine cutting-edge technology with world-class logistics to deliver an experience that feels like magic.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-start text-left">
            {[
              { 
                title: 'Quality First', 
                text: 'Every single item goes through 3 levels of quality checks before it ever leaves our dark stores.',
                icon: ShieldCheck
              },
              { 
                title: 'Always Open', 
                text: 'From early morning breakfast cravings to late-night emergency snacks, we are here for you 24/7.',
                icon: Clock
              },
              { 
                title: 'Local Impact', 
                text: 'We empower local communities by creating thousands of jobs and sourcing from nearby verified suppliers.',
                icon: Users
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div className="text-[120px] font-black text-slate-200/50 leading-none absolute -top-16 -left-4 pointer-events-none group-hover:text-[#10B981]/10 transition-colors">0{i+1}</div>
                <div className="relative z-10 pl-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#10B981] shadow-xl shadow-slate-200/50 mb-8">
                     <item.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{item.title}</h4>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
