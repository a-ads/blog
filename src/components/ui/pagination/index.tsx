import React, { memo } from 'react'
import ReactPaginate from 'react-paginate'
import './pagination.css'

interface IPaginationProps {
  onPageChange: (selectedItem: { selected: number }) => void
  hrefBuilder: () => void
  pageCount: number
  initialPage: number
}

const Pagination = ({
  onPageChange,
  pageCount,
  initialPage,
  hrefBuilder,
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
      hrefBuilder={hrefBuilder}
      nextLabel=' >'
      previousLabel='< '
      breakLabel='...'
    />
  )
}

export default memo(Pagination)
