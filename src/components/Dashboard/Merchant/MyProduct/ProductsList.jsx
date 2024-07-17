import React, { useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { PiDotsThreeCircle } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../../../services/operations/productDeatilsAPI';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { setEditProduct } from '../../../../slices/productSlice';
import { useNavigate } from 'react-router-dom';
import noProductFound from "../../../../assets/Images/noproductFound.jpeg"


const ProductsList = ({ productList, isDeleted, setIsDeleted }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseOver = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseOut = () => {
    setHoveredProduct(null);
  };

  const handleEditBtn = (productId) => {
    dispatch(setEditProduct(true));
    navigate(`/dashboard/edit-product/${productId}`);

  }

  const onPressDelete = async (productId) => {
    console.log("IDHAR AAYA KI NEHIN?");
    setLoading(true);
    await deleteProduct(productId, token);
    setLoading(false);
    setIsDeleted(!isDeleted);
    setConfirmationModal(false);
  }

  const handleDeleteBtn = (productId) => {
    console.log("Chl ria hai");
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You want to delete the product.",
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: () => onPressDelete(productId),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (productList?.length === 0) {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-4 overflow-y-hidden'>
        <img src={noProductFound} alt="NoProduct" className='w-[400px]' />
        <p className='text-3xl text-neutral-5 font-semibold'>No Product found</p>
      </div>
    )
  }

  return (
    <>
      <Table className="w-full mt-6">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Price</Th>
            <Th>Discount</Th>
            <Th>Category</Th>
            <Th>Subcategory</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productList?.length === 0 ? (
            <Tr>
              <Td colSpan={7} className="text-center py-4">No products found</Td>
            </Tr>
          ) : (
            productList.map((product) => (
              <>
                <div className='h-8'></div>
                <Tr className="w-full h-[100px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ">
                  <Td>
                    <div className='flex gap-x-2 items-center'>
                      <img src={product?.image[0]} alt="ProductImg"
                        className="w-[100px] h-[80px] object-cover rounded-md" />
                      <p className='font-semibold'>{product?.name}</p>
                    </div>
                  </Td>
                  <Td className="text-center">{product.price}</Td>
                  <Td className="text-center">{product.discount}</Td>
                  <Td className=" text-center">
                    <span className='relative group'>
                      {breakLongString(product.category.name)}
                      <div className='min-w-max text-xs px-2 p-1 top-5 left-10 max-w-maxContent bg-neutral-11 rounded-sm text-white absolute hidden group-hover:block transition-all duration-200 ease-in'>
                        {
                          product.category.name
                        }
                      </div>
                    </span>

                  </Td>
                  <Td className=" text-center">
                    <span className='relative group'>
                      {breakLongString(product.subCategory.name)}
                      <div className='min-w-max text-xs px-2 p-1 top-5 left-10 max-w-maxContent bg-neutral-11 rounded-sm text-white absolute hidden group-hover:block transition-all duration-200 ease-in'>
                        {
                          product.subCategory.name
                        }
                      </div>
                    </span>
                  </Td>
                  <div className='flex justify-center items-center mt-[30%] '>
                    <Td className={`text-xs text-center border px-3 py-1 rounded-full font-semibold ${product.status === "false" ? "bg-[#F6C1C1] text-secondary-red " : "bg-[#E4FCE4] text-secondary-green"}`}>{product.status === 'true' ? "Published" : "Unpublished"}</Td>
                  </div>
                  <Td>
                    <div onMouseOver={() => handleMouseOver(product._id)} onMouseOut={handleMouseOut}
                      className="relative flex items-center justify-center">
                      <PiDotsThreeCircle className="text-2xl" />
                      {
                        hoveredProduct === product._id && (
                          <div className='flex flex-col absolute left-7 top-2 gap-2 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] bg-white p-3 rounded-sm'>
                            <button onClick={() => { handleEditBtn(product._id) }} className='text-sm hover:text-richBlue-500 cursor-pointer'>Edit</button>
                            {
                              <button disabled={loading} onClick={() => handleDeleteBtn(product._id)} className='text-sm hover:text-richBlue-500 cursor-pointer '>Delete</button>
                            }
                          </div>
                        )
                      }
                    </div>
                  </Td>
                </Tr>
              </>

            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default ProductsList;

// Function to break long strings into two lines by slicing words
function breakLongString(str) {

  const result = str.length > 12 ? str.slice(0, 12) + "..." : str;
  return result;


}
