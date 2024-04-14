const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    rating: {
        type: Number,
        required : true
    },
    review: {
        type: String,
        required: true,
        trim : true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
        index: true,
    },
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);