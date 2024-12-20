import { useState, useMemo, useCallback } from 'react';

interface PaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

export const usePagination = <T>(items: T[], options: PaginationOptions = {}) => {
  const { itemsPerPage = 50, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Reset page if total pages decrease
  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setPage: handlePageChange
  };
};