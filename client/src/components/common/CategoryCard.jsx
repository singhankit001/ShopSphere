import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/products?category=${category.name}`} 
      className="flex flex-col items-center group"
    >
      <motion.div 
        whileHover={{ y: -5 }}
        className="w-full aspect-square rounded-[2rem] p-4 flex items-center justify-center transition-all group-hover:shadow-xl group-hover:shadow-green-50 mb-3"
        style={{ backgroundColor: category.color || '#F8FAF9' }}
      >
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=300&h=300&auto=format&fit=crop';
          }}
        />
      </motion.div>
      <div className="text-center px-1">
        <h3 className="text-[11px] font-black text-slate-700 leading-tight group-hover:text-slate-900 transition-colors">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
