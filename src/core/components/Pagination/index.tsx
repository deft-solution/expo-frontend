'use client';
import React, { useEffect, useState } from 'react';

export interface PaginationTypeProps {
  total: number;
  pageSize: number;
  onChange?: (page: number) => void;
}

const PaginationComponent = (props: PaginationTypeProps) => {
  const { total, pageSize, onChange } = props;
  const [totalPage, setTotalPage] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);

  useEffect(() => {
    setTotalPage(Math.ceil(total / pageSize));
  }, [total, pageSize]);

  const onPaginationChange = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      setActivePage(page);
      const nextOffset = (page - 1) * pageSize;
      if (onChange) {
        onChange(nextOffset);
      }
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const pageRange = 4;

    // Show the first page and ellipsis if necessary
    if (activePage > 1 + pageRange) {
      pages.push(
        <li
          key={1}
          onClick={() => onPaginationChange(1)}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          1
        </li>
      );
      pages.push(
        <li
          key="start-ellipsis"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300"
        >
          ...
        </li>
      );
    }

    // Pages around the current page
    for (
      let i = Math.max(1, activePage - pageRange);
      i <= Math.min(totalPage, activePage + pageRange);
      i++
    ) {
      pages.push(
        <li
          key={i}
          onClick={() => onPaginationChange(i)}
          className={`flex items-center justify-center px-3 h-8 leading-tight border ${
            i === activePage
              ? 'text-blue-600 bg-blue-100 border-blue-300'
              : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
          }`}
        >
          {i}
        </li>
      );
    }

    // Show the last page and ellipsis if necessary
    if (activePage < totalPage - pageRange) {
      pages.push(
        <li
          key="end-ellipsis"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300"
        >
          ...
        </li>
      );
      pages.push(
        <li
          key={totalPage}
          onClick={() => onPaginationChange(totalPage)}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          {totalPage}
        </li>
      );
    }

    return pages;
  };

  // Check if there is only one page
  const isSinglePage = totalPage === 1;

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          {activePage > 1 && (
            <li
              onClick={() => onPaginationChange(activePage - 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              Prev
            </li>
          )}
          {renderPageNumbers()}
          {activePage < totalPage && (
            <li
              onClick={() => onPaginationChange(activePage + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default PaginationComponent;
