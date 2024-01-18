const express = require('express');
const router = express.Router()

// Import Constroller

// Product Controllers Import
const {
    createProduct,
    getAllProducts,
    getProductDetails,
    editProduct,
    getMerchantProducts,
    deleteProduct
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

// Importing Middlewares
const { auth, isCustomer, isMerchant, isAdmin } = require("../middleware/auth")

// ********************************************************************************************************
//                                      Category routes
// ********************************************************************************************************

// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)

// Category can Only be Updated by Admin
router.post("/updateCategory", auth, isAdmin, updateCategory)

// Category can Only be Delete by Admin
router.post("/deleteCategory", auth, isAdmin, deleteCategory)

// Get All Category is access by any one
router.post("/getAllCategory", getAllCategory)

// ********************************************************************************************************
//                                      SubCategory routes
//  ********************************************************************************************************

// SubCategory can Only be Created by Admin
router.post("/createSubCategory", auth, isAdmin, createSubCategory)

// SubCategory can Only be Updated by Admin
router.post("/updateSubCategory", auth, isAdmin, updateSubCategory)

// SubCategory can Only be Delete by Admin
router.post("/deleteSubCategory", auth, isAdmin, deleteSubCategory)

// Get All SubCategory is access by any one
router.post("/getSubCategory", getSubCategory)

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
