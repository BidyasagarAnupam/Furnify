import React from 'react'
import ProductCard from '../common/ProductCard'

const ShowProductTiles = ({ products }) => {
    console.log("Product Listtttt: ", products);
  return (
    products.length === 0 ? (
      <div className='w-full h-full flex items-center justify-center  text-orange-500 text-3xl font-bold'>
        No product found
    </div>
    ): (
      <div className = 'grid grid-cols-4'>
          {
             products.map((product) => (
        <ProductCard product={product} />
      ))
}
    </div >
    )
      
  )
}

export default ShowProductTiles