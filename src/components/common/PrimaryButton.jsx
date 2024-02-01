import React from 'react'

const PrimaryButton = ({ type, text, width }) => {
    return (
        <button
            type={type}
            className={`mt-6 w-${width} rounded-[8px] bg-primary text-neutral-10
                     py-[8px] px-[12px] font-medium transition-all duration-200 ease-in-out
                    hover:scale-105 hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]`}
       >
          {text}
      </button>
  )
}

export default PrimaryButton