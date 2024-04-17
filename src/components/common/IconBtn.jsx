import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    color = "bg-primary",
    txtColor = "primary",
    type,
    loading

}) => {
    return (
        <button
            disabled={loading}
            onClick={onclick}
            type={type}
            className={` flex items-center justify-center ${outline ? `border-2 bg-transparent border-${txtColor} text-${txtColor}` : color
                } cursor-pointer gap-x-1 rounded-md py-2 px-5 font-semibold text-neutral-3 ${customClasses} transition-all duration-200 ease-in-out
                    hover:scale-105 hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]`}
        >
            {children ? (
                <>
                    <span className={`${ outline ? `text-${txtColor}` : " text-neutral-3"}`}>{text}</span>
                    {children}
                </>
            ) : (
                text
            )}
        </button>
    )
}

export default IconBtn