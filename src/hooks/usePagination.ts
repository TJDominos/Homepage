import { useState, useMemo } from 'react';

export function usePagination({ totalItems, itemsPerPage, initialPage = 1 }: {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPreviousPage = () => goToPage(currentPage - 1);

  const canGoToNextPage = currentPage < totalPages;
  const canGoToPreviousPage = currentPage > 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const pageNumbers = useMemo(() => {
    const nums: number[] = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) nums.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) nums.push(i);
        nums.push(-1); // ellipsis
        nums.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        nums.push(1);
        nums.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) nums.push(i);
      } else {
        nums.push(1);
        nums.push(-1);
        nums.push(currentPage - 1);
        nums.push(currentPage);
        nums.push(currentPage + 1);
        nums.push(-1);
        nums.push(totalPages);
      }
    }
    return nums;
  }, [totalPages, currentPage]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    canGoToNextPage,
    canGoToPreviousPage,
    pageNumbers
  };
}
