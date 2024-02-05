import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
    loading

}) => {
    return (
        <button
            disabled={loading}
            onClick={onclick}
            type={type}
            className={`flex items-center ${outline ? "border border-yellow-50 bg-transparent" : "bg-primary"
                } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-neutral-3 ${customClasses}`}
        >
            {children ? (
                <>
                    <span className={`${ "text-neutral-3"}`}>{text}</span>
                    {children}
                </>
            ) : (
                text
            )}
        </button>
    )
}

export default IconBtn