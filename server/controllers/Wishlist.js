const WishList = require("../models/WishList");
const Product = require("../models/Product");

exports.createWishList = async(req,res) =>{
    try{
            //data fetch
        const {name} = req.body;

        const userId = req.user.id;

        //validation
        if(!name || !userId){
            return res.status(400).json({
                success: false,
                message:"All fields are required",
            })
        }

        //create wishlist
        const newWishList = await WishList.create({name});

        await User.findByIdAndUpdate(userId, {
            $push:{
                wishList: newWishList._id,
            }
        })
        //return response
        return res.status(200).json({
            success: true,
            message:"Wishlist created successfully",
            data: newWishList,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message:"Error while creating the wishlist."
        })
    }
}

exports.updateWishList = async(req,res) =>{
   try{
        const {name, wishListId} = req.body;

        //validation
        if(!name || !wishListId){
        return res.status(400).json({
            success: false,
            message:"All fields are required",
        })
    }

    const updatedWishList = await WishList.findByIdAndUpdate(wishListId, {
        name: name,
    });

    return res.status(200).json({
        success: true,
        message:"Wishlist updated successfully",
        data: updatedWishList
    })

   }
   catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message:"Error while updating the name of wishlist."
        })
   }
}

//add product into wishlist
exports.addProductToWishlist = async(req,res) =>{
    try {
            //get data
        const {productid, wishLists} = req.body;

        const userId = req.user.id;

        //validation
        if(!productid || wishLists.size()===0 || !userId){
            return res.status(400).json({
                success: false,
                message:"All fields are required",
            })
        }

        wishLists.forEach(async (wishListId) => {
            await WishList.findByIdAndUpdate(wishListId, {
                $push:{
                    products: productid,
                }
            })
        });

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

//delete a wishlist 
exports.deleteWishlist = async(req,res) =>{
    try {
        const {wishListId} = req.body;
        const userId = req.user.id;

        await User.findByIdAndUpdate(userId, {
            $pull:{
                wishList: wishListId,
            }
        })

        const updatedWishlist = await WishList.findByIdAndDelete(wishListId);

        return res.status(200).json({
            success:true,
            message:"Wishlist is deleted successfully",
            data: updatedWishlist
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while deleting a wishlist",
            error: error.message,
        })
    }
}


exports.getAllWishList = async(req, res) =>{
    try {
        const userId = req.user.id;

        const getAllWishLists = await WishList.find({user: userId})

        return res.status(200).json({
            success:true,
            message:"All wishlists are fetched successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while fetching all wishlist",
            error: error.message,
        })
    }
}

exports.getWishListDetails = async(req, res) =>{
    try {
        const { wishListId } = req.body;

        const wishListDetails = await WishList.findById(wishListId).populate({
            path: 'products',
            model: Product
        });

        return res.status(200).json({
            success: true,
            message: "WishList details feteched successfully",
            data : wishListDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching wishlist details",
            error: error.message,
        })
    }
}


