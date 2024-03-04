import React from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-0 bg-slate-100">
      <div
        className={`flex justify-start flex-1 w-0 -mt-px ${
          currentPage === 1 && "opacity-50 pointer-events-none"
        }`}
      >
        <a
          href="#"
          className="inline-flex items-center pt-4 pr-1 text-sm font-medium hover:text-slate-700"
          onClick={handlePreviousPage}
        >
          <ArrowLongLeftIcon className="w-5 h-5 mr-3 " aria-hidden="true" />
          Previous
        </a>
      </div>
      <div className="flex items-center justify-center flex-1">
        <span className="text-sm ">
          Page {currentPage} of {totalPages} ({itemsPerPage} Items per page)
        </span>
      </div>
      <div
        className={`flex justify-end flex-1 w-0 -mt-px ${
          currentPage === totalPages && "opacity-50 pointer-events-none"
        }`}
      >
        <a
          href="#"
          className="inline-flex items-center pt-4 pl-1 text-sm font-medium hover:text-slate-700"
          onClick={handleNextPage}
        >
          Next
          <ArrowLongRightIcon className="w-5 h-5 ml-3 " aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
};

export default Pagination;
