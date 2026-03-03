import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-slate-100 rounded-2xl ${className}`}></div>
  );
};

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-4">
    <Skeleton className="h-[180px] w-full rounded-[16px]" />
    <div className="space-y-3">
      <Skeleton className="h-3 w-1/4 rounded-md" />
      <Skeleton className="h-5 w-full rounded-md" />
      <Skeleton className="h-3 w-1/2 rounded-md" />
      <div className="flex justify-between items-center pt-3 border-t border-slate-50">
        <Skeleton className="h-6 w-1/3 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-xl" />
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
    <div className="flex flex-col items-center gap-3">
        <Skeleton className="w-full aspect-square rounded-[24px]" />
        <Skeleton className="h-3 w-16 rounded-md" />
    </div>
);

export default Skeleton;
