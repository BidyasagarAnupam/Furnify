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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discount",
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
        ref: "SubCategory",
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Brand",
    },
    status:{
        type: String,
        enum: ["Draft", "Published"],
    },

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;