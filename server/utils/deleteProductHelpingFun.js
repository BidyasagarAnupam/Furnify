const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');

exports.deleteProduct = async (productId, cid, subCategoryId) => {
    // First we fetch all the details of the product
    const productsDetails = await Product.findById(productId);


    await SubCategory.findByIdAndUpdate(subCategoryId, {
        $pull: {
            products : productId,
        }
    })

    await Category.findByIdAndUpdate(cid, {
        $pull: {
            products : productId,
        }
    })
    await Product.findByIdAndDelete(productId);
}