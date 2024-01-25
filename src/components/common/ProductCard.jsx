import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div
    className='
    flex w-auto flex-col gap-y-3 
    items-center justify-center
    hover:cursor-pointer
    pt-3
    '
  >
    <img className='
      aspect-square h-auto
      max-w-44 rounded-md
      transition-all
    ease-in-out
    duration-200
    hover:scale-105
    hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
      ' src={product?.image} alt="ProductImage" />
      <p>{product.name}</p>
  </div>
  )
}

export default ProductCard