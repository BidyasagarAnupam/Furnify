const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

});

module.exports = mongoose.model("subCategory", subcategorySchema);