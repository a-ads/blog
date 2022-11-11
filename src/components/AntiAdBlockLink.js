import React from "react";

import cn from "../utils/cn";

const AntiAdblockLink = ({ children, href, className, ...props }) => {
    return (
        <form 
            action={href} 
            method="get" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <button 
                className={cn('pointer', className)}
                {...props}
            >
                {children}
            </button>
        </form>
    )
}

export default AntiAdblockLink