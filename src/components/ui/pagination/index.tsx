import React, { memo } from 'react'
import ReactPaginate from 'react-paginate'
import './pagination.css'

const Pagination = ({ onPageChange, pageCount }: any) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      activeClassName={'active'}
      nextLabel=' >'
      previousLabel='< '
      breakLabel='...'
    />
  )
}

export default memo(Pagination)
