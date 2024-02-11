import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { addressEndpoints } from "../apis"

const {
    CREATE_ADDRESS_API,
    UPDATE_ADDRESS_API,
    DELETE_ADDRESS_API,
    GET_ALL_ADDRESS_API,
    GET_FULL_ADDRESS_DETAILS_API
} = addressEndpoints

export const addAddress = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_ADDRESS_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_ADDRESS_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Address")
        }
        toast.success("Address added successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE_ADDRESS_API ERROR............", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result
}

export const getAllAddresses = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_ADDRESS_API, null, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("GET_ALL_ADDRESS_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Failed to fetch all Addresses")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_ADDRESS_API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateAddress = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("PUT", UPDATE_ADDRESS_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        console.log("UPDATE ADDRESS API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Address Details")
        }

        toast.success("Address Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE ADDRESS API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteAddress = async (addressId, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_ADDRESS_API, { addressId }, {
            Authorization: `Bearer ${token}`,
        })

        console.log("DELETE ADDRESS API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Address")
        }
        toast.success("Address Deleted Successfully")
    } catch (error) {
        console.log("DELETE ADDRESS API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}

export const getFullAddressDetails = async (addressId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST", GET_FULL_ADDRESS_DETAILS_API, { addressId }, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("GET_FULL_ADDRESS_DETAILS_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Failed to fetch Address Details")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_FULL_ADDRESS_DETAILS_API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

