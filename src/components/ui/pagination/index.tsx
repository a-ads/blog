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

  console.log(location, 'location');

  const getPathForPage = (page: number) => {
    if (page === 1) {
      return location.pathname.replace(/\/index\d*\.html$/, '/') || '/';
    } else {
      return location.pathname.replace(/\/index\d*\.html$/, '') + `/index${page}.html`;
    }
  };

  return (
    <>
      {displayPageNumbers.length > 1 && (
        <ul className='pagination'>
          <li>
            <Link
              to={getPathForPage(currentPage - 1)}
              onClick={() => goToPage(currentPage - 1)}
              className={currentPage === 1 ? 'disabled' : ''}
            >
              {'<'}
            </Link>
          </li>
          {canLoadMore && displayPageNumbers.map((number: number) => {
            const isCurrentPage = currentPage === number;
            const pagePath = getPathForPage(number);

            return (
              <li key={number} className={isCurrentPage ? 'active' : ''}>
                <Link
                  to={pagePath}
                  key={number}
                  className={isCurrentPage ? 'active' : ''}
                >
                  {number}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              to={getPathForPage(currentPage + 1)}
              onClick={() => goToPage(currentPage + 1)}
              className={currentPage === pageNumbers.length ? 'disabled' : ''}
            >
              {'>'}
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default Pagination;
