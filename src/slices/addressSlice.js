import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: null,
    editAddress: false,
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setEditAddress: (state, action) => {
            state.editAddress = action.payload;
        },
        resetAddressState: (state) => {
            state.address = null
            state.editAddress = false
        },
    }
})

export const {
    setAddress,
    setEditAddress,
    resetAddressState,
} = addressSlice.actions

export default addressSlice.reducer