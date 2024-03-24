const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }, 
    image: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "subCategory",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: ["true", "false"]
    }

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;