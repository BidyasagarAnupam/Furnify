const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: String
    },
    about: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Address"
    }
});

module.exports = mongoose.model("Profile", profileSchema);