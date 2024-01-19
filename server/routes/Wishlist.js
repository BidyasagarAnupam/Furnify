const express = require('express');
const router = express.Router()
const { auth, isCustomer } = require("../middleware/auth")

const {
    createWishList,
    updateWishList,
    addProductToWishlist,
    deleteWishlist,
    getAllWishList,
    getWishListDetails
} = require("../controllers/Wishlist");

// ********************************************************************************************************
//                                      Wishlist routes
// ********************************************************************************************************

//Wishlist can only be created by customer
router.post("/createWishList",auth, isCustomer, createWishList)

//Wishlist can only be updated by customer
router.put("/updateWishList",auth, isCustomer, updateWishList)

//Only Customer can add product in the wishlist
router.put("/addProductToWishlist", auth, isCustomer, addProductToWishlist)

//Wishlist can only be deleted by customer
router.delete("/deleteWishlist",auth, isCustomer, deleteWishlist)

//All wishlists can be viewed by Customers only
router.get("/getAllWishList", auth, isCustomer, getAllWishList)

//All products in the wishlist can be viewed by customers only
router.get("/getWishListDetails", auth, isCustomer, getWishListDetails)

module.exports = router
