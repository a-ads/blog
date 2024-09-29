import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'
import { usePhoneMediaQuery } from '/src/utils/breakpoint'

import * as css from './style.module.scss'

const Pagination = ({ currentPage, totalPages, onPageChange, basePath = '/' }) => {
  const [maxPageButtons, setMaxPageButtons] = useState(3)
  const isPhone = usePhoneMediaQuery()

  useEffect(() => {
    if (!isPhone) {
      setMaxPageButtons(5)
    } else {
      setMaxPageButtons(3)
    }
  }, [isPhone, setMaxPageButtons])

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const half = Math.floor(maxPageButtons / 2);
  
    let startPage = Math.max(1, currentPage - half);
    let endPage = Math.min(totalPages, currentPage + half);
  
    if (totalPages <= maxPageButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= half) {
        startPage = 1;
        endPage = maxPageButtons;
      } else if (currentPage + half > totalPages) {
        startPage = totalPages - maxPageButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - half + (maxPageButtons % 2 === 0 ? 1 : 0);
        endPage = currentPage + half;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Link
          to={i !== 1 ? `${basePath}page/${i}` : basePath}
          key={i}
          className={cn(css.pageNumber, i === currentPage && css.active)}
        >
          {i}
        </Link>
      )
    }
    return pageNumbers
  }

  return (
    <div className={css.pagination}>
      <Link
        to={(currentPage - 1) > 1 ? `${basePath}page/${currentPage - 1}` : basePath}
        className={css.prev}
        disabled={currentPage === 1}
      >
        {'<'}
      </Link>
      {renderPageNumbers()}
      <Link
        className={css.next}
        to={!(currentPage + 1 > totalPages) && `${basePath}page/${currentPage + 1}`}
      >
        {'>'}
      </Link>
    </div>
  )
}

export default Pagination
