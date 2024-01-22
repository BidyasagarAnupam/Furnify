import React from 'react'

const CategoryCard = ({category}) => {
  return (
    <div className='flex flex-col gap-y-3'>
        <img className='aspect-square h-auto ' src={category?.image} alt="CategoryImage" />
        <p>{category.name}</p>
    </div>
  )
}

export default CategoryCard