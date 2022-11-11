import React from 'react'

import cn from '../utils/cn'

const Accordion = ({
  label,
  children,
  trigger,
  className,
  ...props
}) => (
  <div className={cn('accordion', className)} {...props}>
      <input
        type='checkbox'
        className='hidden-toggler'
      />
      <span className='trigger'>
        {label}
      </span>
      <ul className='dropdown'>{children}</ul>
  </div>
)

export default Accordion