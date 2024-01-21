import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
    totalItems: localStorage.getItem('totalItems')
        ? JSON.parse(localStorage.getItem('totalItems'))
        : 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state, value) {
            state.user = value.payload;
        },
        // Add to cart
        addToCart: (state, action) => {
            const course = action.payload
            // here findIndex return the index of first element found with condition
            // or -1 if it is not matched with the condition
            const index = state.cart.findIndex((item) => item._id === course._id)

            // if index is >=0 it means that _id is already present in thr cart array
            if (index >= 0) {
                // If the course is already in the cart, do not modify the quantity
                toast.error("Course already in cart")
                return
            }
            // If the course is not in the cart, add it to the cart
            state.cart.push(course)
            // Update the total quantity and price
            state.totalItems++
            state.total += course.price
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course added to cart")
        },

        // remove from cart
        removeFromCart: (state, action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)

            if (index >= 0) {
                // If the course is found in the cart, remove it
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)
                // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")
            }
        },
        // reset cart
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
    }
});

export const { setTotalItems, addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer; 