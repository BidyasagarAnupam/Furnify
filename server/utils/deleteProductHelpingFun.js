const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');
const Brand = require('../models/Brand');
const Discount = require('../models/Discount');

exports.deleteProduct = async (productId, cid, subCategoryId) => {
    // First we fetch all the details of the product
    const productsDetails = await Product.findById(productId);

    // Before delete a propduct 1st we have to pull that product a brand
    const brandId = productsDetails.brand;
    // Pull that product from the brand
    await Brand.findByIdAndUpdate(brandId, {
        $pull: {
            products : productId,
        }
    })

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

    // get the Discound id
    const discountId = productsDetails.discount;
    await Discount.findByIdAndUpdate(discountId, {
        $pull: {
            products : productId,
        }
    })
    await Product.findByIdAndDelete(productId);
}