import React, { memo } from 'react'
import ReactPaginate from 'react-paginate'
import './pagination.css'

interface IPaginationProps {
  onPageChange: (selectedItem: { selected: number }) => void
  pageCount: number
  initialPage: number
}

const Pagination = ({
  onPageChange,
  pageCount,
  initialPage,
}: IPaginationProps) => {
  return (
    <ReactPaginate
      initialPage={initialPage}
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
