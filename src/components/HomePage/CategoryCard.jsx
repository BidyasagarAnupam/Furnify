import React from 'react'

const CategoryCard = ({category}) => {
  return (
    <div
      className='
      flex w-auto flex-col gap-y-3 
      items-center justify-center
      
      '
    >
        <img className='aspect-square h-auto max-w-44 rounded-md' src={category?.image} alt="CategoryImage" />
        <p>{category.name}</p>
    </div>
  )
}

export default CategoryCard