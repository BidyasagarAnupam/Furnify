const Category = require("../models/Category");
require("dotenv").config();
const Product = require("../models/Product");
const SubCategory = require('../models/SubCategory');
const User = require("../models/User");

exports.deleteProduct = async (productId) => {
    // Find the Product
    const product = await Product.findById(productId)
    if (!product) {
        return ({ message: "Product not found" })
    }

    // Delete product from Merchant product array
    const merchantId = product.merchant
    await User.findByIdAndUpdate(merchantId, {
        $pull: { products: productId },
    });


    // Delete from category
    const categoryId = product.category
    await Category.findByIdAndUpdate(categoryId, {
        $pull: { products: productId }
    })
    // Delete from subcategory
    const subCategoryId = product.subCategory
    await SubCategory.findByIdAndUpdate(subCategoryId, {
        $pull: { products: productId }
    })

    // Delete from Brand
    // const brandId = product.brand
    // await Brand.findByIdAndUpdate(brandId, {
    //     $pull: { products: productId }
    // })

    // Delete the course
    await Product.findByIdAndDelete(productId);
}