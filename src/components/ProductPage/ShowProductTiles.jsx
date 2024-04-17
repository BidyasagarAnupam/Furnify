import React from 'react'
import ProductCard from '../common/ProductCard'
import noProductFound from "../../assets/Images/noproductFound.jpeg"

const ShowProductTiles = ({ products }) => {
    console.log("Product Listtttt: ", products);
  return (
    products.length === 0 ? (
      <div className='w-full flex flex-col items-center justify-center gap-4 h-screen overflow-y-hidden'>
        <img src={noProductFound} alt="NoProduct" className='w-[400px]' />
        <p className='text-3xl text-neutral-5 font-semibold'>No Product found</p>
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