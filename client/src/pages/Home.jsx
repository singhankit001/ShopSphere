import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Shield, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 1, name: 'Premium Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop', link: '/categories/electronics' },
  { id: 2, name: 'Minimalist Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop', link: '/categories/fashion' },
  { id: 3, name: 'Home & Living', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop', link: '/categories/home' },
  { id: 4, name: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', link: '/categories/accessories' },
];

const features = [
  { icon: Truck, title: 'Free Global Delivery', desc: 'On all orders above $100' },
  { icon: Shield, title: 'Secure Payments', desc: '100% encrypted transactions' },
  { icon: Clock, title: '24/7 Support', desc: 'Dedicated professional help' },
  { icon: ShoppingBag, title: 'Easy Returns', desc: '30-day money back guarantee' },
];

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-bg-dark z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[120px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-border text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              New Collection 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-white to-text-muted">
              Elevate Your Lifestyle
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover a curated collection of premium products designed to enhance your everyday experiences. Uncompromising quality meets modern aesthetics.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/products" className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-full overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all hover:scale-105">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Shop Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/categories" className="px-8 py-4 bg-transparent border border-border text-text-primary font-semibold rounded-full hover:bg-border transition-colors">
                Explore Categories
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Subtle Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-dark to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 border-y border-border/50 bg-bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-border flex items-center justify-center mb-4 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-muted">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Curated Categories</h2>
            <p className="text-text-muted max-w-xl">Find exactly what you are looking for in our meticulously organized premium catalog.</p>
          </div>
          <Link to="/categories" className="hidden sm:flex text-primary hover:text-primary-dark font-medium items-center gap-1 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
             <motion.div 
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
             >
               <Link to={cat.link} className="block group relative h-80 rounded-2xl overflow-hidden bg-bg-card border border-border">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <div className="flex items-center text-sm text-text-muted group-hover:text-white transition-colors">
                    Explore <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
             </motion.div>
          ))}
        </div>
      </section>
      
      {/* Featured Banner */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/10"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between bg-bg-card border border-primary/20 rounded-3xl p-8 md:p-16 overflow-hidden">
            <div className="absolute right-[-10%] top-[-50%] w-96 h-96 bg-primary blur-[100px] opacity-20 rounded-full"></div>
            
            <div className="md:w-1/2 mb-10 md:mb-0 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">The Future of <br/>Smart Audio.</h2>
              <p className="text-text-muted mb-8 text-lg">Experience crystal clear sound with our next-generation noise cancelling headphones. Immersive audio like never before.</p>
              <Link to="/products" className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                Shop Now
              </Link>
            </div>
            
            <div className="md:w-5/12 relative z-10">
              <motion.img 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" 
                alt="Featured Product" 
                className="rounded-2xl shadow-2xl shadow-black border border-border hue-rotate-15 contrast-125"
              />
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
