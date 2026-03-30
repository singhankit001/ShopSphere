import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = ShoppingBag, 
  title = "Nothing to show here", 
  description = "Looks like this section is currently empty. Let's find something fresh for you!",
  buttonText = "Back to Store",
  buttonLink = "/products",
  onButtonClick = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32 bg-white rounded-[3rem] flex items-center justify-center mb-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-green-50 opacity-50 blur-xl"></div>
        <Icon className="w-14 h-14 text-slate-200 relative z-10" />
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-black text-slate-900 mb-4 tracking-tighter"
      >
        {title}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-slate-400 font-bold uppercase tracking-widest text-[10px] max-w-sm mb-12 leading-loose"
      >
        {description}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {onButtonClick ? (
           <button 
            onClick={onButtonClick}
            className="px-10 py-4.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 group"
          >
            {buttonText} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <Link 
            to={buttonLink}
            className="px-10 py-4.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 group"
          >
            {buttonText} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default EmptyState;
