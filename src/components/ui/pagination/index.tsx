import React from 'react';
import './pagination.css';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

interface IPropsPagination {
  goToPage: (page: number) => void
  displayPageNumbers: number[]
  canLoadMore?: boolean
  pageNumbers: number[]
  currentPage: number
}

const Pagination = ({
  goToPage,
  displayPageNumbers,
  canLoadMore,
  pageNumbers,
  currentPage,
}: IPropsPagination) => {

  const getPageNumber = (number: number) => {
    const location = useLocation();
    const pathPrefix = location.pathname !== '/' ? location.pathname : '';

    // Remove any previous /indexN.html segment from the pathPrefix
    const cleanPathPrefix = pathPrefix.replace(/\/index\d*\.html/g, '');
    console.log(location.pathname, 'location.pathname');
    return number === 1
      ? `${cleanPathPrefix}`
      : `${cleanPathPrefix}/index${number}.html?page=${number}`;
  }

  return (
    <>
      {displayPageNumbers.length > 1 && (
        <ul className='pagination'>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          {canLoadMore &&
            displayPageNumbers.map((number: any) => {
              return (
                <li key={number} className={currentPage === number ? 'active' : ''}>
                  <Link
                    to={getPageNumber(number)}
                    key={number}
                    className={currentPage === number ? 'active' : ''}
                  >
                    {number}
                  </Link>
                </li>
              )
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
  )
}

export default Pagination
