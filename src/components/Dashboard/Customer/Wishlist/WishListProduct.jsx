import React from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import IconBtn from "../../../common/IconBtn"
import { MdDelete } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { deleteProductFromWishlist } from '../../../../services/operations/WishListAPI';

const WishListProduct = ({ allWishList, wishlistUpdated, setWishlistUpdated }) => {

  const { token } = useSelector((state) => state.auth);

  const handleOnDelete = async (productId) => {
    const res = await deleteProductFromWishlist(productId, token);
    if(res) setWishlistUpdated(!wishlistUpdated);
  }

  return (
    <>
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
            allWishList?.length === 0 ? (
              <Tr>
                <Td>
                  No product Found
                </Td>
              </Tr>
            ) :
              (
                allWishList?.map((product) => (
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
                          {/* TODO: We have to slice a description if that description is long */}
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
                    <Td className="flex flex-col gap-2">
                      <IconBtn
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
                  </Tr>
                ))
              )
          }
        </Tbody>
      </Table>
    </>
  )
}

export default WishListProduct