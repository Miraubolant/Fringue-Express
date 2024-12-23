import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  itemsPerPage?: number;
}

export const useInfiniteScroll = <T>(
  items: T[],
  options: UseInfiniteScrollOptions = {}
) => {
  const { threshold = 200, itemsPerPage = 50 } = options;
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);

  // Load initial items
  useEffect(() => {
    setDisplayedItems(items.slice(0, itemsPerPage));
  }, [items, itemsPerPage]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      const nextPage = page + 1;
      const start = 0;
      const end = nextPage * itemsPerPage;
      
      // Only update if we have more items to show
      if (end <= items.length) {
        setDisplayedItems(items.slice(start, end));
        setPage(nextPage);
      }
    }
  }, [items, page, itemsPerPage, threshold]);

  // Add scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    displayedItems,
    hasMore: displayedItems.length < items.length
  };
};