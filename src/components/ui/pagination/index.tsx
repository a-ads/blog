import React, { memo } from 'react'
import ReactPaginate from 'react-paginate'
import './pagination.css'

interface IPaginationProps {
  onPageChange: (selectedItem: { selected: number }) => void
  hrefBuilder: (currentPage: number) => void
  pageCount: number
  initialPage: number
  currentPage: number
}

const Pagination = ({
  onPageChange,
  pageCount,
  initialPage,
  hrefBuilder,
  currentPage,
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
      hrefBuilder={() => hrefBuilder(currentPage)}
      nextLabel=' >'
      previousLabel='< '
      breakLabel='...'
    />
  )
}

export default memo(Pagination)
