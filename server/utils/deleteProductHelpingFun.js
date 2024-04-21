const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const RatingAndReview = require('../models/RatingAndReview');

const deleteProduct = async (productId, cid, subCategoryId) => {
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

    // Delete rating and reviews

    await RatingAndReview.deleteMany({ product: productId })
    
    // productsDetails.forEach(async (product) => {
    //     await deleteProduct(productId, cid, subId);
    // });

    // Delete the Order
    // Find orders containing the specified product ID
    const ordersWithProduct = await Order.find({ product: productId });

    if (ordersWithProduct.length === 0) {
        console.log('No orders found containing the product.');
        return;
    }

    // Extract user IDs from the orders
    const userIds = ordersWithProduct.map(order => order.user);

    // Pull the product ID from the 'ordered' array of each user
    await User.updateMany(
        { _id: { $in: userIds } }, // Find users by their IDs
        { $pull: { ordered: productId } } // Pull the product ID from the 'ordered' array
    );

    // Now delete the order
    await Order.deleteMany({ product: productId });

    await Product.findByIdAndDelete(productId);
}
module.exports = deleteProduct;
