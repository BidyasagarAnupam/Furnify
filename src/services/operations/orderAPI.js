import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { ordersEndpoints } from "../apis"
import { setLoading } from "../../slices/authSlice"

const { GET_ALL_ORDERS_API, UPDATE_STATUS_API } = ordersEndpoints

export async function fetchOrders(token) {
        let result = [];

        try {
            const res = await apiConnector
                (
                   "POST", 
                   GET_ALL_ORDERS_API,"", {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                })
            
            if(!res?.data?.success) {
                throw new Error(res.data.message)
            }

            result = res?.data?.data;
            console.log("RESPONSE OF GET_CATEGORIES_API.......",res);


        } catch (error) {
            console.log("GET_ALL_ORDERS_API ERROR............", error);
            toast.error(error.message);
        }

        return result;

    }
    

export function updateOrder(token, orderId, status){
    return async () => {

        try {
            const res = await apiConnector("PUT", UPDATE_STATUS_API, { orderId, status }, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })

            if (!res?.data?.success) {
                throw new Error(res.data.message)
            }

            console.log("RESPONSE OF GET_CATEGORIES_API.......", res);
            toast.success("Order updated successfully")
            

        } catch (error) {
            console.log("UPDATE_STATUS_API ERROR............", error);
            toast.error(error.message);
        }

    }
}