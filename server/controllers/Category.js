const mongoose = require('mongoose');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');
const Brand = require('../models/Brand');
const Discount = require('../models/Discount');

const deleteProduct = async (productId, cid) => {
    // First we fetch all the details of the product
    const productsDetails = Product.findById(productId);

    // Before delete a propduct 1st we have to pull that product a brand
    const brandId = productsDetails.brand;
    // Pull that product from the brand
    await Brand.findByIdAndUpdate(brandId, {
        $pull: {
            products : productId,
        }
    })

    await Category.findByIdAndUpdate(cid, {
        $pull: {
            products : productId,
        }
    })

    // get the Discound id
    const discountId = productsDetails.discount;
    await Discount.findByIdAndUpdate(discountId, {
        $pull: {
            products : productId,
        }
    })
    await Product.findByIdAndDelete(productId);
}

exports.createCategory = async(req,res)=>{
    try{
        //fetch data
        const name = req.body;
        //validation
        if(!name){
            return res.status(403).json({
                success: false,
                message:"All fields are required",
            });
        }

        const categoryDetails = await Category.create({name})

        return res.status(200).json({
            success: true,
            message: "Category created successfully",
            data: categoryDetails
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in creating category"
        })
    }
}

exports.updateCategory = async(req,res) =>{
    try {
        const {name, cid} = req.body;

    const updateCategoryDetails = await Category.findByIdAndUpdate(cid, 
        {name});

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updateCategoryDetails
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in updateing Category"
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const {cid} =  req.body;

        const categoryDetails = await Category.findById(cid);

        categoryDetails.subCategory.forEach( async (subCategoryId) => {

            // /fetch the subcategory details from one category
            const subCategoryDetails = SubCategory.findById(subCategoryId);

            // Now we Delete all the Product from that subCategory
            subCategoryDetails.products.forEach( async (productId) => {
                await deleteProduct(productId, cid);
            });

            // Delete the SubCategory
            await SubCategory.findByIdAndDelete(subCategoryId);
        });




        

        
    } catch (error) {
        
    }
}