const Brand = require("../models/Brand");
const Category = require("../models/Category");
const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");

exports.createBrand = async(req,res) =>{
    try{
         //user id fetch
        const {userId} = req.user.id;
        //fetch data
        const {name, category, subCategory} = req.body;
        //validation
        if(!name || !category || !subCategory){
            return res.status(403).json({
                success: false,
                message:"All fields are required",
            });
        }

        const createBrand = await Brand.create({
            name,
            category,
            subCategory,
        });

        return res.status(200).json({
            success: true,
            message:"Brand created successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }   
}

// /Update the brand
exports.updateBrand = async(req,res) =>{
    try{
        const {name, category, subCategory, brandId} = req.body;
        if(!name || !category || !subCategory || !brandId){
            return res.status(403).json({
                success: false,
                message:"All fields are required",
            }); 
        }

        const updateBrandDetails = await Brand.findByIdAndUpdate(brandId,{
            name,
            category,
            subCategory,
        })

        if(!updateBrandDetails){
            return res.status(403).json({
                success: false,
                message:"Incorrect Brand ID",
            }); 
        }

        return res.status(200).json({
            success: true,
            message:"Brand updated successfully",
            data: updateBrandDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//delete brand
exports.deleteBrand = async(req,res) =>{
    try {
        const {brandId} = req.body;

    const brandDetails = await Brand.findById(brandId);
    const products = brandDetails.products;

    products.forEach(async (product) => {
        const productDetails = await Product.findById(product);

        const merchantId = productDetails.merchant;
        const categoryId = productDetails.category;
        const subcategoryId = productDetails.subcategory;

        // Delete the product from products array in User
        await User.findByIdAndUpdate(merchantId, {
            $pull: { products: product },
        });

        // Delete the product and brand from Category
        await Category.findByIdAndUpdate(categoryId, {
            $pull: { 
                products: product, 
                brands: brandId 
            },
        });

        // Delete the product and brand from SubCategory
        await SubCategory.findByIdAndUpdate(subcategoryId, {
            $pull: { 
                products: product, 
                brands: brandId 
            },
        });

        // Delete the whole product
        await Product.findByIdAndDelete(product);

   })
   const updatedBrand = await Brand.findByIdAndDelete(brandId);

   return res.status(200).json({
    success: true,
    message: "Brand deleted successfully",
    data : updatedBrand
   })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
    
}

// /TODO: GET ALL BRANDS