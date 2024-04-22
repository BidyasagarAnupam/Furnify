import React, { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import IconBtn from "../../../common/IconBtn"
import { MdDelete } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductFromWishlist } from '../../../../services/operations/WishListAPI';
import { ACCOUNT_TYPE } from "../../../../utils/constants"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { addToCart } from '../../../../slices/cartSlice';
import ConfirmationModal from '../../../common/ConfirmationModal'
import EmptyWishlist from "../../../../assets/Images/empty_wishlist.jpg"



const WishListProduct = ({ allWishList, wishlistUpdated, setWishlistUpdated }) => {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleOnDelete = async (productId) => {
    const res = await deleteProductFromWishlist(productId, token);
    if(res) setWishlistUpdated(!wishlistUpdated);
  }

  const handleAddToCart = (product) => {
    if (user && user?.accountType === ACCOUNT_TYPE.MERCHANT) {
      toast.error("You are a Merchant, you cant buy a product");
      return;
    }
    if (token) {
      console.log("dispatching add to cart")
      dispatch(addToCart(product));
      return;
    }
    setConfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <>
      {
        allWishList?.length === 0 ? (
          <div className='w-full -mt-16 flex flex-col justify-center items-center '>
            <img src={EmptyWishlist} alt="EmptyWishlist" className='w-[600px] ' />
            <p className='text-3xl text-red-600 font-semibold tracking-wide'>Your Wishlist is empty!</p>
            <p className='mt-3 mb-4 text-md text-center text-richBlue-600 font-medium tracking-wide'>
            Seems like you don't have wishes here. <br />Make a wish!
            </p>
            <IconBtn
              text="Start Shopping"
              onclick={() => navigate('/allProducts')}
              txtColor='text-white'
            />
          </div>
        ) : (
          <Table className="w-full">
            <Thead>
              <Tr className="flex gap-x-10 justify-between rounded-t-md px-6 py-2">
                <Th>
                  Product
                </Th>
                <Th className="pr-10">
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                allWishList?.map((product) => (
                  <div onClick={() => navigate(`/product/${product._id}`)} className='hover:cursor-pointer'>
                    <Tr key={product._id}
                      className="flex gap-x-10 justify-between border-b border-neutral-4 px-6 py-8">
                      <Td>
                        <div className='flex gap-x-4'>
                          <div>
                            <img src={product.image} alt={product.name}
                              className="h-[150px] w-[220px] rounded-lg object-cover" />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p className='font-bold'>{product.name}</p>
                            <p>{product.description}</p>
                            <div className='flex gap-x-2 items-center mt-1'>
                              {/* Price */}
                              <div className='flex gap-2 items-center'>
                                <p className='text-xl font-semibold'>
                                  {`₹${(Math.round(product.price - (product.price * (product.discount / 100)))).toLocaleString('en-IN')}`}
                                </p>
                                <p className='text-sm line-through text-neutral-9'>
                                  {
                                    `₹${(product.price).toLocaleString('en-IN')}`
                                  }
                                </p>
                              </div>
                              {/* discount */}
                              <div>
                                <p className='text-secondary-red'>
                                  {`${product.discount}% off`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Td>
                      <div className='h-fit' onClick={(e) => e.stopPropagation()}>
                        <Td className="flex flex-col gap-2">
                          <IconBtn
                            onclick={() => handleAddToCart(product)}
                            text={"Add to Cart"}>
                            <IoCartSharp className='text-lg' />
                          </IconBtn>
                          <IconBtn onclick={() => handleOnDelete(product._id)}
                            text={"Delete"}
                            color='bg-secondary-red'
                          >
                            <MdDelete className='text-xl' />
                          </IconBtn>
                        </Td>
                      </div>
                    </Tr>
                  </div>
                ))
              }
            </Tbody>
          </Table>
        ) 
      }
      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default WishListProduct