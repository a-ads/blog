import React from 'react'

import cn from '../utils/cn'

export default React.memo(({ i, size, height, width, style = {}, className, ...props }) => 
    <span
        style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: '0.5s ease',
            width: width || (size / 16 + 'rem'),
            height: height || (size / 16 + 'rem'),
            ...style
        }}
        className={cn('pass-down-size', className)}
        {...props}
    >
        {i}
    </span>
)