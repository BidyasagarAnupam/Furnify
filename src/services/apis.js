const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
}

// ADDRESS ENDPOINTS
export const addressEndpoints = {
  CREATE_ADDRESS_API: BASE_URL + "/profile/createAddress",
  UPDATE_ADDRESS_API: BASE_URL + "/profile/updateAddress",
  DELETE_ADDRESS_API: BASE_URL + "/profile/deleteAddress",
  GET_ALL_ADDRESS_API: BASE_URL + "/profile/getAllAddress",
  GET_FULL_ADDRESS_DETAILS_API: BASE_URL + "/profile/getFullAddressDetails",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// PRODUCT ENDPOINTS
export const productsEndpoints = {
  CREATE_PRODUCT_API: BASE_URL + "/product/createProduct",
  GET_ALL_PRODUCTS_API: BASE_URL + "/product/getAllProducts",
  GET_NEW_PRODUCTS_API: BASE_URL + "/product/getNewProducts",
  GET_PRODUCT_DETAILS_API: BASE_URL + "/product/getProductDetails",
  EDIT_PRODUCT_API: BASE_URL + "/product/editProduct",
  GET_MERCHANT_PRODUCTS_API: BASE_URL + "/product/getMerchantProducts",
  DELETE_PRODUCT_API: BASE_URL + "/product/deleteProduct",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/product/getReviews",
}

// CATAGORIES ENDPOINTS
export const categoriesEndpoints = {
  GET_CATEGORIES_API: BASE_URL + "/product/getAllCategory",
  UPDATE_CATEGORIES_API: BASE_URL + "/product/updateCategory",
  DELETE_CATEGORIES_API: BASE_URL + "/product/deleteCategory",
  CREATE_CATEGORIES_API: BASE_URL + "/product/createCategory",
}

// SUB CATAGORIES ENDPOINTS
export const subCategoriesEndpoints = {
  GET_SUBCATEGORIES_API: BASE_URL + "/product/getSubCategory",
  UPDATE_SUBCATEGORIES_API: BASE_URL + "/product/updateSubCategory",
  DELETE_SUBCATEGORIES_API: BASE_URL + "/product/deleteSubCategory",
  CREATE_SUBCATEGORIES_API: BASE_URL + "/product/createSubCategory",
}


// WISHLIST ENDPOINTS
export const wishListEndpoints = {
  ADD_PRODUCT_TO_WISHLIST_API: BASE_URL + "/wishlist/addProductToWishlist",
  GET_ALL_PRODUCT_FROM_WISHLIST_API: BASE_URL + "/wishlist/getAllWishList",
  DELETE_PRODUCT_FROM_WISHLIST_API: BASE_URL + "/wishlist/deleteProductFromWishlist",
}

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// ORDERS ENDPOINTS
export const ordersEndpoints = {
  GET_ALL_ORDERS_API: BASE_URL + "/order/my-orders",
  UPDATE_STATUS_API: BASE_URL + "/order/update-order",
  GET_ALL_ORDER_MERCHANT_API: BASE_URL + "/order/merchant-orders"
}

// RATING & REVIEWS API
export const ratingReviewEndpoints = {
  CREATE_RATING_API: BASE_URL + "/product/createRating",
  REVIEWS_DETAILS_API: BASE_URL + "/product/getReviews",
  GET_PRODUCT_REVIEW_API: BASE_URL + "/product/getProductRatingReview"
}

export const customerEndpoints = {
  PRODUCT_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  PRODUCT_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}