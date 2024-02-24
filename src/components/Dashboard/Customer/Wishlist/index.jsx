import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllProductsFromWishlist } from '../../../../services/operations/WishListAPI';
import WishListProduct from './WishListProduct';

const Wishlist = () => {

  const [allWishList, setAllWishList] = useState([]);
  const [wishlistUpdated, setWishlistUpdated] = useState(false);
  const { token } = useSelector((state) => state.auth)
  let res = [];
  useEffect(() => {
    async function fetchDetails() {
      res = await getAllProductsFromWishlist(token);
      res = res[0].products;
      setAllWishList(res);
    }
    fetchDetails();
  }, [wishlistUpdated])


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