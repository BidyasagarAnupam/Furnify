const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: String
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
    addressDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Address"
    }]
});

module.exports = mongoose.model("Profile", profileSchema);