import React from 'react';

export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-[#455859]/10 border-2 border-dashed border-black/20 ${className}`}></div>
);

export const CardSkeleton = () => (
  <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]">
    <Skeleton className="h-36 w-full !border-b-2 !border-solid !border-black" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <div className="flex gap-1">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  </div>
);

export const GridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const ListSkeleton = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} className="h-24 w-full" />
    ))}
  </div>
);
