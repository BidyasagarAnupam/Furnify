import React from 'react'
import { useState, useEffect } from 'react';
import {getNewProducts} from "../../services/operations/productDeatilsAPI"
import ProductCard from '../common/ProductCard';

const RenderNewLaunches = () => {
    const [newProduct, setNewProduct] = useState([]);
    useEffect( ()=>{
        const getNewProduct = async() =>{
            const res = await getNewProducts();
            if(res){
                setNewProduct(res);
            }
        }
        getNewProduct();
    },[])
  return (
    <div className='grid w-11/12 mx-auto gap-y-5 lg:grid-cols-6 md:grid-cols-4 grid-cols-3'>
       { newProduct.map((product, index) =>(
            <ProductCard key={index} product={ product}/>
        ))}
    </div>
  )
}

export default RenderNewLaunches