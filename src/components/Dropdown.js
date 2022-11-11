import React, { useState, cloneElement, useEffect, useRef } from 'react'

import cn from '../utils/cn'

function useClick (where, el, cb) {
  useEffect(() => {
    if (!el) return

    const handlers = {
      outside: e => !el.contains(e.target) && cb(),
      inside: e => el.contains(e.target) && cb(),
    }

    document.addEventListener('click', handlers[where])
    return () => {
      document.removeEventListener('click', handlers[where])
    }
  }, [el, cb, where])
}

export default function Dropdown ({
    toggler,
    items,
    className,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef(null)

    useClick('outside', wrapperRef.current, () => setIsOpen(false))

    return <div className='relative' ref={wrapperRef}>
        {cloneElement(
            toggler, 
            { 
                ...toggler.props, 
                onClick: () => { toggler.props.onClick && toggler.props.onClick(); setIsOpen(!isOpen) },
                className: cn('pointer border-0', toggler.props.className)
            })
        }
        <div 
            className={cn('absolute py-1 bg-grey-100', className)} 
            hidden={!isOpen} 
            {...props}
        >
           {items.map((el, key) => 
            cloneElement(el, { ...el.props, key, className: cn('p-0n5 palette-grey-100 pointer', el.props.className) })
           )}
        </div>
    </div>
}