import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { categoriesEndpoints } from "../apis"

const {
    GET_CATEGORIES_API,
    UPDATE_CATEGORIES_API,
    CREATE_CATEGORIES_API,
    DELETE_CATEGORIES_API
} = categoriesEndpoints

export const fetchCategories = async() =>{
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_CATEGORIES_API)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.data;
        console.log("RESPONSE OF GET_CATEGORIES_API.......", response);

    }
    catch (error) {
        console.log("GET_CATEGORIES_API API ERROR............", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const editCategory = async(data, token) =>{
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("PUT",UPDATE_CATEGORIES_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        }); 
        console.log("UPDATE CATEGORY API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Category Details")
          }

          toast.success("Category Details Updated Successfully")
          result = response?.data?.data
    } 
    catch (error) {
        console.log("EDIT CATEGORY API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createCategory = async(data, token) =>{
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response  = await apiConnector("POST", CREATE_CATEGORIES_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE CATEGORY API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Category Details")
        }
        toast.success("Category Details Added Successfully")
        result = response?.data?.data
    }
    catch (error) {
        console.log("CREATE CATEGORY API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteCategory = async(data, token) =>{
    const toastId = toast.loading("Loading...")
    
    try {
        const response = await apiConnector("DELETE", DELETE_CATEGORIES_API, data, {
            Authorization: `Bearer ${token}`,
        })

        console.log("DELETE CATEGORY API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Delete Category")
        }
        toast.success("Category Deleted")
    } 
    catch (error) {
        console.log("DELETE CATEGORY API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}