import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    color = "bg-primary",
    type,
    loading

}) => {
    return (
        <button
            disabled={loading}
            onClick={onclick}
            type={type}
            className={`flex items-center justify-center ${outline ? `border bg-transparent border-${color} text-${color}` : color
                } cursor-pointer gap-x-1 rounded-md py-2 px-5 font-semibold text-neutral-3 ${customClasses}`}
        >
            {children ? (
                <>
                    <span className={`${"text-neutral-3"}`}>{text}</span>
                    {children}
                </>
            ) : (
                text
            )}
        </button>
    )
}

export default IconBtn