const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Customer", "Merchant"],
        required: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    image: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    ordered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    wishList: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"WishList"
    },
});

module.exports = mongoose.model("User", userSchema);