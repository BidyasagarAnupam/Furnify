const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date.now(),
        required: true,
    }
});

module.exports = mongoose.model("WishListSchema", wishListSchema);