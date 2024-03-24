import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductDetails } from '../../../../services/operations/productDeatilsAPI';
import { setEditProduct, setProduct } from '../../../../slices/productSlice';
import ProductBuilderForm from '../AddProduct/ProductBuilderForm';
import { useDispatch, useSelector } from 'react-redux';

const EditProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product)
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getproductDetails = async () => {
      setLoading(true);
      const res = await fetchProductDetails(productId);
      if (res.data[0]) {
        console.log("product is--->", product);
        // dispatch(setEditProduct(true));
        dispatch(setProduct(res.data[0]))
        // console.log("product is--->", product);
      }
      setLoading(false)
    }
    getproductDetails();
  }, [])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner">Spinner</div>
      </div>
)
  }

  return (
    <div>
      {
        product ? (<ProductBuilderForm />) : (<p>No Product found</p>)
      }
    </div>
  )
}

export default EditProduct