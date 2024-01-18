const User = require("../models/User");
const WishList = require("../models/WishList");


exports.deleteWishList = async (wishListId, userId) => {
    await User.findByIdAndUpdate(userId, {
        $pull: {
            wishList: wishListId,
        }
    })

    const updatedWishlist = await WishList.findByIdAndDelete(wishListId);

    return updatedWishlist;
}