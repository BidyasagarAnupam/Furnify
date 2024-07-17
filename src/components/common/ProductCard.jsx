import React, { useEffect, useState } from 'react'
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { getAllProductsFromWishlist, deleteProductWishlist, addProductToWishlist, addProductToWishList, deleteProductFromWishlist } from '../../services/operations/WishListAPI'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import ReactStars from 'react-stars';
import { TiStarFullOutline } from 'react-icons/ti';
import GetAvgRating from '../../utils/avgRating';
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
    console.log("Val: ", res[0].products);
    if (res[0].products.some(obj => obj._id === productId)) {
      return true;
    } else {
      return false;
    }
  }

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
  const navigate = useNavigate();
  const rating = product.ratingAndReviews;
  console.log("RATING", product);
  let avg = GetAvgRating(rating)
  return (

    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className='relative bg-white cursor-pointer ml-10 flex flex-col items-start justify-between w-[250px] h-fit rounded-lg
      
       '>
      <div className='w-full '>
        <img src={product.image} alt="" className="w-full h-[220px] rounded-lg object-cover" />
      </div>
      <div className='mt-3 p-2 flex flex-col gap-1 w-full'>
        <p className='text-medium font-semibold '>{`${product.name}`}</p>
        <div className='flex items-center gap-2'>
          <ReactStars
            className='flex text-xs'
            count={5}
            edit={false}
            value={avg}
            size={20}
            color2="#ffa534"
            emptyIcon={<TiStarFullOutline />}
            fullIcon={<TiStarFullOutline />}
          />
          <p className='font-semibold'>{avg }</p>
        </div>
        <div className='flex justify-between items-center mt-1'>
          {/* Price */}
          <div className='flex gap-2 items-center'>
            <p className='text-lg font-semibold'>
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
            <p className='bg-[#EB3D4D] px-2 py-1 mr-2 rounded-md text-white font-medium text-sm'>
              {`${discount}% off`}
            </p>
          </div>
        </div>
      </div>

      <button className='absolute rounded-full right-3 top-3 h-9 w-9 bg-white flex items-center justify-center'
           // to avoid the functionality of parent
          onClick={(e) => { e.stopPropagation(); }}
        >
          {
            isLiked ? <FcLike fontSize="1.5rem" onClick={() => removeProductHandler(product._id)} /> : <FcLikePlaceholder fontSize="1.5rem" onClick={() => addProductHandler(product._id)} />
          }
        </button>
    </div>
  )
}

export default ProductCard