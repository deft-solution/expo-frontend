'use client';
import React, { useEffect, useState } from 'react';

export interface PaginationTypeProps {
  total: number;
  pageSize: number;
  onChange?: (page: number) => void;
  showPrevNext?: boolean; // New prop to show "Previous" and "Next" buttons
}

const PaginationComponent = (props: PaginationTypeProps) => {
  const { total, pageSize, onChange, showPrevNext = false } = props;
  const [totalPage, setTotalPage] = useState<number>(0);
  const [list, setList] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setTotalPage(Math.ceil(total / pageSize));
  }, [total, pageSize]);

  useEffect(() => {
    const items = Array.from({ length: totalPage }, (_, index) => index + 1);
    setList(items);
  }, [totalPage]);

  const onPaginationChange = (page: number) => {
    setCurrentPage(page);
    const nextOffset = (page - 1) * pageSize;
    if (onChange) {
      onChange(nextOffset);
    }
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm justify-between items-center">
          {showPrevNext && (
            <li
              onClick={() => currentPage > 1 && onPaginationChange(currentPage - 1)}
              className={`flex items-center justify-center p-5 h-8 leading-tight rounded-sm cursor-pointer ${
                currentPage > 1 ? 'bg-main text-white' : 'bg-white text-gray-500 cursor-not-allowed'
              }`}
            >
              Previous
            </li>
          )}
          <div className="flex px-10">
            {list.map((idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => onPaginationChange(idx)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {idx}
                </li>
              );
            })}
          </div>
          {showPrevNext && (
            <li
              onClick={() => currentPage < totalPage && onPaginationChange(currentPage + 1)}
              className={`flex items-center justify-center p-5 h-8 leading-tight rounded-sm cursor-pointer ${
                currentPage < totalPage
                  ? 'bg-main text-white'
                  : 'bg-white text-gray-500 cursor-not-allowed'
              }`}
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
