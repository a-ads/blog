import React from 'react'
import './pagination.css'
import { Link } from 'gatsby'

const Pagination = ({
  goToPage,
  displayPageNumbers,
  canLoadMore,
  pageNumbers,
  currentPage,
}: any) => {
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
                <li className={currentPage === number ? 'active' : ''}>
                  <Link
                    to={
                      number === 1
                        ? `${location.origin}${location.pathname}`
                        : `${location.origin}${location.pathname}?page=${number}`
                    }
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
