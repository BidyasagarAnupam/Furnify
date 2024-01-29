const express = require('express');
const router = express.Router()
const { auth, isCustomer } = require("../middleware/auth")

const {
    addProductToWishlist,
    getAllWishList,
    deleteProductWishlist
} = require("../controllers/Wishlist");

// ********************************************************************************************************
//                                      Wishlist routes
// ********************************************************************************************************


//Only Customer can add product in the wishlist
router.put("/addProductToWishlist", auth, isCustomer, addProductToWishlist)

//All wishlists can be viewed by Customers only
router.get("/getAllWishList", auth, isCustomer, getAllWishList)

//Only Customer can remove product from the wishlist
router.put("/deleteProductFromWishlist", auth, isCustomer, deleteProductWishlist)

module.exports = router
