import React from 'react'
import ProductBuilderForm from './ProductBuilderForm';
import { useSelector } from 'react-redux';

const AddProduct = () => {
  const { editProduct } = useSelector((state) => state.product);
  return (
    <div>
        <ProductBuilderForm/>
    </div>
  )
}

export default AddProduct