const Address = require('../models/Address');
const Order = require('../models/Order');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { deleteProduct } = require('../utils/deleteProduct');
const WishList = require('../models/WishList');



// update Profile
exports.updateProfile = async (req, res) => {
    try {
        // get data
        const { firstName, lastName, dateOfBirth = "", contactNumber, gender } = req.body;
        // get userId(From Cookies)
        const id = req.user.id;
        // verify data
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // find profile
        let userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails;
        const profilDetails = await Profile.findById(profileId);
        // update profile
        profilDetails.dateOfBirth = dateOfBirth;
        profilDetails.gender = gender;
        profilDetails.contactNumber = contactNumber;

        //! Update User extra
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();

        await profilDetails.save();
        userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return responce
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully Updated",
            // profilDetails,
            data: userDetails
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// delete Account
// TODO Explore -> how can we schedule this operation
// TODO Expolre Cron Job(✅)
exports.deleteAccount = async (req, res) => {
    try {
        // get user id
        console.log("Printing Id ", req.user);
        const id = req.user.id;
        // validation
        const userDetails = await User.findById({ _id: id });

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // fetch thr profile detaisl
        const profileDetail = await Profile.findById({ _id: userDetails.additionalDetails });

        // Now delete all the addresses of that User
        profileDetail.addressDetails.forEach(async (addressId) => {
            await Address.findByIdAndDelete({ _id: addressId })
        })

        // Now delete the Profile Also
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // Now delete the Order of that user (For the customer)
        userDetails.ordered.forEach(async (orderId) => {
            await Order.findByIdAndDelete({ _id: orderId })
        })

        // Now delete all  Products for that Merchant
        userDetails.products.forEach(async (productId) => {
            await deleteProduct(productId)
        })

        // Now delete the wishlist for that Customer
        await WishList.findByIdAndDelete({ _id: userDetails.wishList });

        // delete user
        await User.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: "User deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted successfully"
        });
    }
}

// DONE
exports.getAllUserDetails = async (req, res) => {
    try {
        // get id
        const id = req.user.id;

        // validation
        // validation & get user details
        const userDetails = await User.findById(id).populate({
            path: "additionalDetails",
            populate: {
                path: "addressDetails",
            }
        }).exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User data fetched Successfully",
            data: userDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be found",
            error: error.message
        });
    }
}

// TODO
exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("Backend calling updateDisplayPicture");
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        console.log("User Id for profile", userId);
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log("From backend IMg is ",image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        ).populate("additionalDetails").exec(); //! ADDED BY ME
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


exports.getOrderedProducts = async (req, res) => {
    try {
        const userId = req.user.id
        const userDetails = await User.findOne({
            _id: userId,
        })
            .populate("ordered")
            .exec()
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.ordered,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};