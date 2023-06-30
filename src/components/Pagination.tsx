"use client";

import { useState } from "react";

type Props = {
  currentPage: number;
  setCurrentPage: any;
  pages: number[];
};

const Pagination = ({ currentPage, setCurrentPage, pages }: Props) => {
  // LENGTH OF PAGINATION
  const [paginationLimit] = useState<number>(5);
  // MAXIMUM PAGE SHOWN ON PAGINATION
  const [maxPagination, setMaxPagination] = useState<number>(5);
  // MINIMUM PAGE SHOWN ON PAGINATION
  const [minPagination, setMinPagination] = useState<number>(1);

  const handleNext = () => {
    setCurrentPage((prev: number) => prev + 1);

    if (currentPage + 1 > maxPagination) {
      setMinPagination(minPagination + paginationLimit);
      setMaxPagination(maxPagination + paginationLimit);
    }
  };

  const handlePrev = () => {
    setCurrentPage((prev: number) => prev - 1);

    console.log(currentPage);
    console.log(minPagination);

    if (currentPage - 1 < minPagination) {
      setMinPagination(minPagination - paginationLimit);
      setMaxPagination(maxPagination - paginationLimit);
    }
  };

  return (
    <div className="flex justify-center">
      {/* LEFT */}
      <button
        className="rounded-l-lg border border-gray-300 px-2 py-2 font-serif font-bold leading-tight text-slate-600 active:border-slate-600 active:bg-slate-600 active:text-white disabled:border-inherit disabled:bg-inherit disabled:text-inherit disabled:opacity-50"
        onClick={handlePrev}
        disabled={currentPage <= 1}
      >
        &#x2B05;
      </button>
      {pages.map((page: number) => {
        return page <= maxPagination && page >= minPagination ? (
          <button
            key={page}
            className={`border px-3 py-2 font-bold leading-tight ${
              page === currentPage ? "border-slate-600 bg-slate-600 text-white" : "border-gray-300"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ) : null;
      })}
      {/* RIGHT */}
      <button
        className="rounded-r-lg border border-gray-300 px-2 py-2 font-serif font-bold leading-tight text-slate-600 active:border-slate-600 active:bg-slate-600 active:text-white disabled:border-inherit disabled:bg-inherit disabled:text-inherit disabled:opacity-50"
        onClick={handleNext}
        disabled={currentPage >= pages.length}
      >
        &#x27A1;
      </button>
    </div>
  );
};
export default Pagination;
