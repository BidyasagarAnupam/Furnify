const WishList = require("../models/WishList");
const Product = require("../models/Product");
const User = require("../models/User")

//add product into wishlist
exports.addProductToWishlist = async (req, res) => {
    try {
            //get data
        const {productid} = req.body;

        const userId = req.user.id;

        const userDetails = await User.findById(userId);
        
        const wishlistId = userDetails.wishList;

        //validation
        if(!productid || !userId){
            return res.status(400).json({
                success: false,
                message:"All fields are required",
            })
        }

        await WishList.findByIdAndUpdate(wishlistId, {
                $push:{
                    products: productid,
                }
            })


        return res.status(200).json({
            success: true,
            message:"Product is added to the wishlist."
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Product is not added to the wishlist",
            error: error.message,
        })
    }
}

exports.deleteProductWishlist = async (req, res) => { 
    try {
        //get data
        const { productid } = req.body;

        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        const wishlistId = userDetails.wishList;

        //validation
        if (!productid || !userId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        await WishList.findByIdAndUpdate(wishlistId, {
            $pull: {
                products: productid,
            }
        })


        return res.status(200).json({
            success: true,
            message: "Product is removed from the wishlist."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to remove the product",
            error: error.message,
        })
    }
}

exports.getAllWishList = async(req, res) =>{
    try {
        const userId = req.user.id;

        const getAllWishLists = await WishList.find({ user: userId }).populate('products');

        return res.status(200).json({
            success:true,
            message: "All wishlists are fetched successfully",
            data: getAllWishLists
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while fetching all wishlist",
            error: error.message,
        })
    }
}


