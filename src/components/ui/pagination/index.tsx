import React from 'react';
import './pagination.css';
import { Link } from 'gatsby';

interface IPropsPagination {
  goToPage: (page: number) => void
  displayPageNumbers: number[]
  canLoadMore?: boolean
  pageNumbers: number[]
  currentPage: number
  path?: string
}

const Pagination = ({
  goToPage,
  displayPageNumbers,
  canLoadMore,
  pageNumbers,
  currentPage,
  path
}: IPropsPagination) => {

  const getPageNumber = (number: number) => {
    return number === 1
      ? path
      : `${path?.replace(/index\d*\.html/g, '')}index${number}.html?page=${number}`;
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
