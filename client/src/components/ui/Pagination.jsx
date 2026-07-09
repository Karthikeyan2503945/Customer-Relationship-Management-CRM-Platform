import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  className = '',
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={`flex items-center justify-between px-2 py-4 ${className}`}>
      <span className="text-small text-slate-500 dark:text-slate-400">
        Showing Page <span className="font-semibold text-slate-700 dark:text-slate-300">{currentPage}</span> of{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">{totalPages}</span>
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={handlePrev}
          icon={<ChevronLeft className="h-4 w-4" />}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={handleNext}
          icon={<ChevronRight className="h-4 w-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
