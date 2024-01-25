import React from 'react'

const ProductCard = ({ product }) => {
  
  let price = product.price;
  const discount = product.discount;
  let displayPrice = Math.round(price - (price * (discount / 100)));
  displayPrice = displayPrice.toLocaleString('en-IN')
  price = price.toLocaleString('en-IN')
  return (

      <div className="
      w-64
      shadow-md  hover:shadow-xl
      transition-shadow duration-300 ease-in-out
      rounded-md flex-none bg-white
      "
    >
      <img src={product.image} alt="" />
      <p>{`${product.name} (${product.weight.substring(0, 30)}...`}</p>
      
      <div className='flex justify-between items-center'>
        {/* Price */}
        <div className='flex gap-2 items-center'>
          <p className='text-xl font-semibold'>
            {`₹${displayPrice}`}
          </p>
          <p className='text-sm line-through text-neutral-9'>
            {
              `₹${price}`
            }
          </p>
        </div>
        {/* discount */}
        <div>
          <p className='text-secondary-red'>
            {`${discount}% off`}
            </p>
        </div>
      </div>


      </div>
  )
}

export default ProductCard