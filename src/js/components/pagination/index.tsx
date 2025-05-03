import type React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(1);

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    if (rangeStart > 2) {
      pageNumbers.push("ellipsis1");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pageNumbers.push("ellipsis2");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center mt-6 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 text-sm rounded-md cursor-pointer border transition-all border-gray-300 duration-200 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed "
            : "bg-white text-gray-700 hover:bg-blue-100"
        }`}
        aria-label="Previous page"
      >
        &laquo;
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === "ellipsis1" || page === "ellipsis2") {
          return (
            <button
              key={`${page}-${index}`}
              className={`px-3 py-2 text-sm rounded-md cursor-pointer border transition-all border-gray-300`}
            >
              &hellip;
            </button>
          );
        }

        return (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            className={`px-4 py-2 text-sm rounded-md cursor-pointer border transition-all duration-200 ${
              page === currentPage
                ? "bg-blue-600 text-white cursor-not-allowed border-blue-600"
                : "bg-white text-gray-700 hover:bg-blue-100 border-gray-300"
            }`}
            disabled={page === currentPage}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 text-sm rounded-md border transition-all cursor-pointer duration-200 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-blue-100"
        }`}
        aria-label="Next page"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
