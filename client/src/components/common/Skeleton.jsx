import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-slate-100 rounded-2xl ${className}`}></div>
  );
};

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm space-y-5">
    <Skeleton className="aspect-square w-full rounded-[2rem]" />
    <div className="px-1.5 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
    <div className="flex flex-col items-center gap-4">
        <Skeleton className="w-full aspect-square rounded-[2.5rem]" />
        <Skeleton className="h-4 w-16 rounded-full" />
    </div>
);

export default Skeleton;
