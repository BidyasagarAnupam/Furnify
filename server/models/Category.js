const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subCategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "SubCategory"
        }
    ],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
});

module.exports = mongoose.model("Category", categorySchema);