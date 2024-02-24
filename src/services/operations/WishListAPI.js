import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { wishListEndpoints } from "../apis"


const {
    ADD_PRODUCT_TO_WISHLIST_API,
    GET_ALL_PRODUCT_FROM_WISHLIST_API,
    DELETE_PRODUCT_FROM_WISHLIST_API
} = wishListEndpoints

export const addProductToWishList = async (productid, token) => {
    if (!token) {
        toast.error("Please login first...");
        return;
    }
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("PUT", ADD_PRODUCT_TO_WISHLIST_API, { productid }, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("ADD_PRODUCT_TO_WISHLIST_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Product to Wishlist")
        }
        toast.success("Product Added into Wishlist Successfully")
        result = response?.data?.success

    } catch (error) {
        console.log("ADD_PRODUCT_TO_WISHLIST_API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getAllProductsFromWishlist = async (token) => {
    if (!token) {
        toast.error("Please login first...");
        return;
    }
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_PRODUCT_FROM_WISHLIST_API, null, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        
        if (!response?.data?.success) {
            throw new Error("Could Not get all Product from Wishlist")
        }
        result = response?.data?.data
        console.log("GET_ALL_PRODUCT_FROM_WISHLIST_API RESPONSE............", result)
    } catch (error) {
        console.log("GET_ALL_PRODUCT_FROM_WISHLIST_API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteProductFromWishlist = async (productid, token) => {
    if (!token) {
        toast.error("Please login first...");
        return;
    }
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("PUT", DELETE_PRODUCT_FROM_WISHLIST_API, { productid }, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("DELETE_PRODUCT_FROM_WISHLIST_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Product from Wishlist")
        }
        toast.success("Product Deleted from Wishlist Successfully")
        result = response?.data?.success

    } catch (error) {
        console.log("ADD_PRODUCT_TO_WISHLIST_API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}