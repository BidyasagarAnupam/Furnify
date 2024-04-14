const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    orderedAt: {
        type: Date,
        default: Date.now,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    status: {
        type: String,
        enum: ["Confirmed", "Shipped", "Out for Delivery", "Delivered"]
    }
});

module.exports = mongoose.model("Order", orderSchema);