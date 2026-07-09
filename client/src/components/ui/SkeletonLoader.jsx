import React from 'react';

export default function SkeletonLoader({
  type = 'card', // card | table | chart | list
  className = '',
}) {
  const cardSkeleton = (
    <div className="animate-pulse flex flex-col gap-4 p-5 border border-slate-100 rounded-card bg-white dark:bg-slate-900/50 dark:border-slate-800">
      <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded" />
    </div>
  );

  const tableSkeleton = (
    <div className="animate-pulse w-full overflow-hidden border border-slate-100 rounded-card dark:border-slate-800 bg-white dark:bg-slate-900/40">
      <div className="h-12 bg-slate-100 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800" />
      <div className="p-4 flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-4 flex-1 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );

  const chartSkeleton = (
    <div className="animate-pulse flex flex-col gap-4 p-5 border border-slate-100 rounded-card bg-white dark:bg-slate-900/50 dark:border-slate-800 min-h-[300px] justify-between">
      <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="flex items-end gap-3 flex-1 h-48 pt-4">
        {[40, 80, 50, 90, 60, 100, 70].map((height, idx) => (
          <div
            key={idx}
            className="bg-slate-200 dark:bg-slate-800 rounded-t w-full"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded" />
    </div>
  );

  const skeletons = {
    card: cardSkeleton,
    table: tableSkeleton,
    chart: chartSkeleton,
  };

  return <div className={className}>{skeletons[type] || cardSkeleton}</div>;
}
