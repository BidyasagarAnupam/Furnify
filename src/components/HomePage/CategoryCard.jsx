import React from 'react'

const CategoryCard = ({category}) => {
  return (
    <div
      className='
      flex w-auto flex-col gap-y-3 
      items-center justify-center
      hover:cursor-pointer
      pt-3
      '
    >
      <img loading='lazy' className='
        aspect-square h-auto
        max-w-44 rounded-md
        transition-all
      ease-in-out
      duration-200
      hover:scale-105
      hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
        ' src={category?.image} alt="CategoryImage" />
        <p>{category.name}</p>
    </div>
  )
}

export default CategoryCard