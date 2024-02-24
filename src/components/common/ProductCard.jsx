import React, { useEffect, useState } from 'react'
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { getAllProductsFromWishlist, deleteProductWishlist, addProductToWishlist, addProductToWishList, deleteProductFromWishlist } from '../../services/operations/WishListAPI'
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {

  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  // check whether the product is already exists or not
  const isLikedFunction = async (productId) => {
    if (!token) {
      console.log("LOGOUT");
      return false;
    }
    const res = await getAllProductsFromWishlist(token);

    if (res[0].products.some(obj => obj._id === productId)) {
      return true;
    } else {
      return false;
    }
  }

  // TODO: add and delete product from wishlist
  const addProductHandler = async (productId) => {
    const res = await addProductToWishList(productId, token);
    console.log("Result:  ", res);
    if (res) {
      console.log("islikes is: ", isLiked);
      setIsLiked(true);
      console.log("islikes is: ", isLiked);
    }
    console.log("Add hua");
    // setIsLiked(true)
  }

  const removeProductHandler = async (productId) => {
    const res = await deleteProductFromWishlist(productId, token);
    if (res) {
      setIsLiked(false);
    }
    console.log("Remove hua");
    // setIsLiked(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      await isLikedFunction(product._id).then(
        res => setIsLiked(res)
      )
      console.log("Inside useEffect", isLiked);
    }
    fetchData()
  }, [])

  let price = product.price;
  const discount = product.discount;
  let displayPrice = Math.round(price - (price * (discount / 100)));
  displayPrice = displayPrice.toLocaleString('en-IN')
  price = price.toLocaleString('en-IN')
  return (

    <div className="
    neomorphic
      w-64
      mb-5
      rounded-md flex-none bg-white relative
      hover:cursor-pointer
      transition-all
      ease-in-out
      duration-200
      hover:scale-105
      hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
      "
    >
      <div>
        <img src={product.image} alt="" className="h-full w-full rounded-t-[10px]" />
      </div>

      <div className='p-3'>
        <p className='text-[15px]'>{`${product.name} (${product.weight.substring(0, 30)}...`}</p>

        <div className='flex justify-between items-center mt-3'>
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

      <button className='absolute rounded-full 
      right-3 bottom-32 h-9 w-9 bg-white
      flex items-center justify-center
      '>
        {
          isLiked ? <FcLike fontSize="1.5rem" onClick={() => removeProductHandler(product._id)} /> : <FcLikePlaceholder fontSize="1.5rem" onClick={() => addProductHandler(product._id)} />
        }

      </button>


    </div>
  )
}

export default ProductCard