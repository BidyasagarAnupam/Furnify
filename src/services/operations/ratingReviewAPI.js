import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { ratingReviewEndpoints } from "../apis"

const { CREATE_RATING_API, REVIEWS_DETAILS_API, GET_PRODUCT_REVIEW_API } = ratingReviewEndpoints

// create a rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE RATING API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Rating")
        }
        toast.success("Rating Created")
        success = true
    } catch (error) {
        success = false
        console.log("CREATE RATING API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return success
}

export const getAllRatingReviews  = async() => {
    // const toastId = toast.loading("Loading...")
    let result = [];
    try {
        const response = await apiConnector(
            "GET",
            REVIEWS_DETAILS_API
        ) 

        if(!response.data.success) {
            throw new Error("Could Not Fetch All Rating & Reviews")
        }

        result = response.data.data;


    } catch (error) {
        console.log("REVIEWS_DETAILS_API ERROR............", error)
        toast.error(error.message)
    }
    // toast.dismiss(toastId)
    return result;
}

export const getProductRatingReview = async (productId) => {
    const toastId = toast.loading("Loading...")
    let result = [];
    try {
        const response = await apiConnector(
            "POST",
            GET_PRODUCT_REVIEW_API,
            {productId}
        )

        if (!response.data.success) {
            throw new Error("Could Not Fetch Product Rating & Reviews")
        }

        result = response.data.data;

    } catch (error) {
        console.log("GET_PRODUCT_REVIEW_API ERROR............", error)
        toast.error(error.message)
    }
    
    toast.dismiss(toastId)
    return result;
}


