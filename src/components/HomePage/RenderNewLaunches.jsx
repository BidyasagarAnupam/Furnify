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
                console.log("The new products are: ", res);
            }
        }
        getNewProduct();
    },[])
  return (
      <div className="mx-5 py-4 flex gap-12 overflow-x-scroll no-scrollbar">
       { newProduct.map((product, index) =>(
            <ProductCard key={index} product={ product}/>
        ))}
    </div>
  )
}

export default RenderNewLaunches