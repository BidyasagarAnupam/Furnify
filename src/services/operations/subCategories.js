import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { categoriesEndpoints, subCategoriesEndpoints } from "../apis"

const {
    GET_SUBCATEGORIES_API,
    UPDATE_SUBCATEGORIES_API,
    CREATE_SUBCATEGORIES_API,
    DELETE_SUBCATEGORIES_API
} = subCategoriesEndpoints

export const fetchsubCategories = async (cid) => {
    console.log("Frontend CID call: ", cid);
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_SUBCATEGORIES_API, { cid }, {
           cid
        })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.data;
        console.log("RESPONSE OF GET_SUBCATEGORIES_API.......", response);

    }
    catch (error) {
        console.log("GET_SUBCATEGORIES_API API ERROR............", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const editsubCategory = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("PUT", UPDATE_SUBCATEGORIES_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        console.log("UPDATE SUBCATEGORY API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update SubCategory Details")
        }

        toast.success("SubCategory Details Updated Successfully")
        result = response?.data?.data
    }
    catch (error) {
        console.log("EDIT SUBCATEGORY API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSubCategory = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector("POST", CREATE_SUBCATEGORIES_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE SUBCATEGORY API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add SubCategory Details")
        }
        toast.success("SUbCategory Details Added Successfully")
        result = response?.data?.data
    }
    catch (error) {
        console.log("CREATE SUBCATEGORY API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSubCategory = async (subId, token) => {
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("DELETE", DELETE_SUBCATEGORIES_API, {subId}, {
            Authorization: `Bearer ${token}`,
        })

        console.log("DELETE SUBCATEGORY API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete SubCategory")
        }
        toast.success("SubCategory Deleted")
    }
    catch (error) {
        console.log("DELETE SUBCATEGORY API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}