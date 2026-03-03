import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group flex flex-col items-center gap-[12px] p-[16px] rounded-[32px] transition-all duration-500 hover:-translate-y-[6px] cursor-pointer"
    >
      {/* Image container — premium circular design */}
      <div 
        className="w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] group-hover:scale-105"
        style={{ backgroundColor: category.color || '#F8F9FA' }}
      >
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400'; }}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-slate-100 animate-pulse" />
        )}
      </div>

      {/* Title — centered premium label */}
      <h3
        className="text-[13px] font-black text-slate-900 text-center leading-tight tracking-tight font-premium px-1 transition-colors group-hover:text-emerald-500"
        style={{
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.5em'
        }}
      >
        {category.name}
      </h3>
    </Link>
  );
};

export default React.memo(CategoryCard);
