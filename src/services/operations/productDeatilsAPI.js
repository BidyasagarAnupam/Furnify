import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { productsEndpoints } from "../apis"


const {
  CREATE_PRODUCT_API,
  GET_ALL_PRODUCTS_API,
  GET_PRODUCT_DETAILS_API,
  EDIT_PRODUCT_API,
  GET_MERCHANT_PRODUCTS_API,
  DELETE_PRODUCT_API,
  GET_NEW_PRODUCTS_API
} = productsEndpoints

export const getAllProducts = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_PRODUCTS_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Products")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_PRODUCTS_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getNewProducts = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_NEW_PRODUCTS_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch New Products")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_NEW_PRODUCTS_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchProductDetails = async (productId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("GET", GET_PRODUCT_DETAILS_API, {
      productId,
    })
    console.log("GET_PRODUCT_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("GET_PRODUCT_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// add the Product details
export const addProductDetails = async (data, token) => {
  console.log("Data ------>>>", data);
  let result = null
  const toastId = toast.loading("Loading...")
  console.log("Status data: ", data.status);
  try {
    const response = await apiConnector("POST", CREATE_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE_PRODUCT_API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Product Details")
    }
    toast.success("Product Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE_PRODUCT_API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the Product details
export const editProductDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Product Details")
    }
    toast.success("PRODUCT Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT PRODUCT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all products under a specific Merchant
export const fetchMerchantProducts = async (query, token) => {
  let result = []
  console.log("Query", query);
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "POST",
      GET_MERCHANT_PRODUCTS_API,
      query,
      {
        Authorization: `Bearer ${token}`,
      },
    )
    console.log("MERCHANT PRODUCTS API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Merchant Products")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("MERCHANT PRODUCTS API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a product
export const deleteProduct = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_PRODUCT_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete product")
    }
    toast.success("product Deleted")
  } catch (error) {
    console.log("DELETE PRODUCT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}


