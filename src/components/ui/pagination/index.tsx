import React from 'react';
import './pagination.css';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

interface IPropsPagination {
  goToPage: (page: number) => void;
  displayPageNumbers: number[];
  canLoadMore?: boolean;
  pageNumbers: number[];
  currentPage: number;
}

const Pagination = ({
                      goToPage,
                      displayPageNumbers,
                      canLoadMore,
                      pageNumbers,
                      currentPage,
                    }: IPropsPagination) => {
  const location = useLocation();

  const getNextPageUrl = (pageNumber: number) => {
    if (pageNumber === 1) {
      return '/';
    } else {
      const currentPageIndex = location.pathname.lastIndexOf('index');
      if (currentPageIndex !== -1) {
        return `${location.pathname.slice(0, currentPageIndex)}/index${pageNumber}.html`;
      } else {
        return `${location.pathname}/index${pageNumber}.html`;
      }
    }
  };

  return (
    <>
      {displayPageNumbers.length > 1 && (
        <ul className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            {'<'}
          </button>
          {canLoadMore &&
            displayPageNumbers.map((number: any) => {
              return (
                <li key={number} className={currentPage === number ? 'active' : ''}>
                  <Link
                    to={getNextPageUrl(number)}
                    key={number}
                    className={currentPage === number ? 'active' : ''}
                  >
                    {number}
                  </Link>
                </li>
              );
            })}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            {'>'}
          </button>
        </ul>
      )}
    </>
  );
};

export default Pagination;
