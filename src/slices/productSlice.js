import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  product: null,
  editProduct: false,
  paymentLoading: false,
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setEditProduct: (state, action) => {
      state.editProduct = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetProductState: (state) => {
      state.product = null
      state.editProduct = false
    },
  },
})

export const {
  // setStep,
  setProduct,
  setEditProduct,
  setPaymentLoading,
  resetProductState,
} = productSlice.actions

export default productSlice.reducer