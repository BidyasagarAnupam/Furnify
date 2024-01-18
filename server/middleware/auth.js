const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/User')
// auth
exports.auth = async (req, res, next) => {
    console.log("Auth middleware");
    try {
        // extract token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");

        console.log("-------------------\nFrom AUTH middleware: " + token, "\n");

        // if token missing, then return responce
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        console.log("TOKEN IS INSIDE AUTH middleware: " + token, "\n");
        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("WE check req ki user", req.user); // ! CHECK IT
            console.log("Decode ", decode);
            req.user = decode;
            console.log("WE check req ki user after adding", req.user);

        } catch (err) {
            // issue in varifivation
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
                error: err
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            err: error.message,
            message: "Something went wrong while validating the token",
        });
    }
}

// isCustomer
exports.isCustomer = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Customer") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Customer only"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}

// isMerchant
exports.isMerchant = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Merchant") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Merchant only"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}