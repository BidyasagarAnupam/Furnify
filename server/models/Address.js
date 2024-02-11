const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    address: {
        type: String,
        // require: true
    },
    city: {
        type: String,
        // required: true
    },
    state: {
        type: String,
        // required: true
    },
    zipCode: {
        type: Number,
        // required: true
    },
    name: {
        type: String,
    },
    contactNumber: {
        type: Number,
    },
    addressType: {
        type: String,
        enum: ["Home", "Work"]
    },
    locality: {
        type: String,
    }
    
});

module.exports = mongoose.model("Address", addressSchema);