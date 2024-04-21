import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import productReducer from "../slices/productSlice"
import addressReducer from "../slices/addressSlice"
import categoryReducer from "../slices/categorySlice"


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: productReducer,
    address: addressReducer,
    product: productReducer,
    category: categoryReducer
})

export default rootReducer