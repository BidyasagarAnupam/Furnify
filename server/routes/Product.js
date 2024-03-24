const express = require('express');
const router = express.Router()
const { auth, isMerchant, isAdmin } = require("../middleware/auth")

// Import Constroller

// Product Controllers Import
const {
    createProduct,
    getAllProducts,
    getProductDetails,
    editProduct,
    getMerchantProducts,
    deleteProduct,
    getNewProducts
} = require("../controllers/Product");

// Category Controllers Import
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory
} = require("../controllers/Category");

// Subcategory Controllers Import
const {
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSubCategory
} = require("../controllers/SubCategory");

// Brand Controllers Import
const {
    createBrand,
    updateBrand,
    deleteBrand,
    getAllBrands
} = require("../controllers/Brand");

// TODO: Rating and review Controllers


// ********************************************************************************************************
//                                      Category routes
// ********************************************************************************************************

// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)

// Category can Only be Updated by Admin
router.put("/updateCategory", auth, isAdmin, updateCategory)

// Category can Only be Delete by Admin
router.delete("/deleteCategory", auth, isAdmin, deleteCategory)

// Get All Category is access by any one
router.get("/getAllCategory", getAllCategory)

// ********************************************************************************************************
//                                      SubCategory routes
//  ********************************************************************************************************

// SubCategory can Only be Created by Admin
router.post("/createSubCategory", auth, isAdmin, createSubCategory)

// SubCategory can Only be Updated by Admin
router.put("/updateSubCategory", auth, isAdmin, updateSubCategory)

// SubCategory can Only be Delete by Admin
router.delete("/deleteSubCategory", auth, isAdmin, deleteSubCategory)

// Get All SubCategory is access by any one
router.get("/getSubCategory", getSubCategory)

// ********************************************************************************************************
//                                      Brand routes
//  ********************************************************************************************************

// Brand can Only be Created by Admin
router.post("/createBrand", auth, isAdmin, createBrand)

// Brand can Only be Updated by Admin
router.post("/updateBrand", auth, isAdmin, updateBrand)

// Brand can Only be Delete by Admin
router.post("/deleteBrand", auth, isAdmin, deleteBrand)

// Get All Brand is access by any one
router.post("/getAllBrands", getAllBrands)

// ********************************************************************************************************
//                                      Product routes
//  ********************************************************************************************************

//Product can be created by Merchant only
router.post("/createProduct", auth, isMerchant, createProduct)

//Products can be viewed by any one.
router.get("/getAllProducts", getAllProducts)

//New Products can be viewed by any one.
router.get("/getNewProducts", getNewProducts)

//Product Details can be viewed by any one
router.post("/getProductDetails", getProductDetails)

//Product can be edited by merchant only
router.post("/editProduct", auth, isMerchant, editProduct)

//Merchant can only see his/her listed products
router.post("/getMerchantProducts", auth, isMerchant, getMerchantProducts)

//Product can be deleted by merchant only
router.delete("/deleteProduct", auth, isMerchant, deleteProduct)

module.exports = router

