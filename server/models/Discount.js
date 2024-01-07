const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }],
    brand: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubCategory",
    }],
    
});

module.exports = mongoose.model("Brand", discountSchema);