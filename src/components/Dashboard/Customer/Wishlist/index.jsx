import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllProductsFromWishlist } from '../../../../services/operations/WishListAPI';
import WishListProduct from './WishListProduct';
import Spinner from "../../../common/Spinner"

const Wishlist = () => {

  const [allWishList, setAllWishList] = useState([]);
  const [wishlistUpdated, setWishlistUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth)
  let res = [];
  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      res = await getAllProductsFromWishlist(token);
      res = res[0].products;
      setAllWishList(res);
      setLoading(false);
    }
    fetchDetails();
  }, [wishlistUpdated])

  if(loading){
    return (
      <div className='w-full h-screen flex justify-center items-center -mt-20'>
        <Spinner/>
      </div>
    )
  }
  return (
    <div>
      <h1 className='text-3xl mb-4 font-semibold'>
        Wishlist
      </h1>
      {
        <WishListProduct allWishList={ allWishList } wishlistUpdated={wishlistUpdated} setWishlistUpdated={setWishlistUpdated} />
      }
    </div>
  )
}

export default Wishlist