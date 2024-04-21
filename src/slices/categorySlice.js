import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editSubCategory: false,
    editCategory: false,
    subCategory: null,
    category: null,
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setEditSubCategory: (state, action) => {
            state.editSubCategory = action.payload
        },
        setEditCategory: (state, action) => {
            state.editCategory = action.payload
        },
        setSubCategory: (state, action) => {
            state.subCategory = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
    },
})

export const {
    setEditSubCategory,
    setEditCategory,
    setSubCategory,
    setCategory
} = categorySlice.actions

export default categorySlice.reducer