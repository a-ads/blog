import React from 'react'
import cn from 'classnames'

import * as css from './style.module.scss'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    let startPage, endPage

    if (totalPages <= 5) {
      startPage = 1
      endPage = totalPages
    } else {
      if (currentPage <= 3) {
        startPage = 1
        endPage = 5
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4
        endPage = totalPages
      } else {
        startPage = currentPage - 2
        endPage = currentPage + 2
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={cn(css.pageNumber, i === currentPage && css.active)}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  return (
    <div className={css.pagination}>
      <button
        className={css.prev}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {renderPageNumbers()}
      <button
        className={css.next}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  )
}

export default Pagination
