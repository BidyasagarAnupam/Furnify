import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { PiDotsThreeCircle } from "react-icons/pi";

const ProductsList = ({ productList }) => {
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
              <Tr key={product._id} className="w-full mt-8 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ">
                <Td>
                  <div className='flex gap-x-2 items-center'>
                    <img src={product?.image} alt="ProductImg"
                      className="w-[100px] h-[80px] object-cover rounded-md" />
                    <p>{product?.name}</p>
                  </div>
                </Td>
                <Td className="text-center">{product.price}</Td>
                <Td className="text-center">{product.discount}</Td>
                <Td className=" text-center">{breakLongString(product.category.name)}</Td>
                <Td className=" text-center">{breakLongString(product.subCategory.name)}</Td>
                <div className='flex justify-center items-center mt-[30%] '>
                  <Td className={`text-xs text-center border px-3 py-1 rounded-full font-semibold ${product.status === "Unpublished" ? "bg-[#F6C1C1] text-secondary-red " : "bg-[#E4FCE4] text-secondary-green"}`}>{product.status}</Td>
                </div>
                <Td>
                  <div className="flex items-center justify-center">
                    <PiDotsThreeCircle className="text-2xl" />
                  </div>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default ProductsList;

// Function to break long strings into two lines by slicing words
function breakLongString(str) {

  const result = str.slice(0, 12) + "...";
  return result;


}
