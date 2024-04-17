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
        : 0,
    step: 1,
    quantities: localStorage.getItem("quantities")
        ? JSON.parse(localStorage.getItem("quantities"))
        : Array.from({ length: localStorage.getItem('totalItems') || 0 }, () => 1),
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload
        },
        setTotalItems(state, value) {
            state.user = value.payload;
        },
        // Add to cart
        addToCart: (state, action) => {
            const product = action.payload
            // here findIndex return the index of first element found with condition
            // or -1 if it is not matched with the condition
            const index = state.cart.findIndex((item) => item._id === product._id)

            // if index is >=0 it means that _id is already present in thr cart array
            if (index >= 0) {
                // If the product is already in the cart, do not modify the quantity
                toast.error("Product already in cart")
                return
            }
            // If the product is not in the cart, add it to the cart
            state.cart.push(product)
            // Update the total quantity and price
            state.totalItems++
            state.total += (Math.round(product.price - (product.price * (product.discount / 100))))

            // Update quantities array
            state.quantities.push(1); // Assuming default quantity is 1 for newly added product

            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            localStorage.setItem("quantities", JSON.stringify(state.quantities)); // Update quantities in localStorage
            // show toast
            toast.success("Product added to cart")
        },

        // remove from cart
        removeFromCart: (state, action) => {
            const productId = action.payload
            const index = state.cart.findIndex((item) => item._id === productId)

            if (index >= 0) {
                // If the product is found in the cart, remove it
                state.totalItems--
                let p = state.cart[index].price
                let d = state.cart[index].discount
                state.total -= (Math.round(p - (p * (d / 100))))
                state.cart.splice(index, 1)
                // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Product removed from cart")
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

        updateQuantity(state, action) {
            const { index, newValue } = action.payload;
            state.quantities[index] = newValue;
            console.log("From slice",state.quantities[index]);
            localStorage.setItem("quantities", JSON.stringify(state.quantities))

        },
        removeQuantity(state, action) {
            const index = action.payload;
            state.quantities.splice(index, 1);
            localStorage.setItem("quantities", JSON.stringify(state.quantities))
        },
    }
});

export const { setTotalItems, addToCart, removeFromCart, resetCart, setStep, updateQuantity, removeQuantity } = cartSlice.actions;
export default cartSlice.reducer; 