const User = require('../models/User');
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcrypt');
const crypto = require("crypto");


// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from req body
        const email = req.body.email;
        // check user for the email, email validation
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your Email is not registered with us"
            })
        }

        // generate token
        const token = crypto.randomBytes(20).toString("hex"); //! Understand ?

        // update by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({ email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000
        }, { new: true });

        console.log("DETAILS", updatedDetails);

        // create url
        const url = `https://furnify-frontend.vercel.app/update-password/${token}`;

        // send mail containing url
        await mailSender(email, "Password Reset Link",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );
        // return responce

        return res.status(200).json({
            success: true,
            token: token,
            message: "Email sent successfully, please check email and change password"
        });


    } catch (error) {
        console.log("Error in Reset password ", error);
        return res.status(500).json({
            success: false,
            message: "Someting went wrong while reset password",
            error: error.message
        })
    }
}

// resetPassword
exports.resetPassword = async (req, res) => {
    try {
        // data fetch 
        const { password, confirmPassword, token } = req.body;
        console.log("Backend main aaraha hai");
        // validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not matching"
            });
        }
        // get user details from db using token
        const userDetails = await User.findOne({ token: token });
        // if no entry - invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token Invalid"
            });
        }
        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(500).json({
                success: false,
                message: "Token is expired, please regenerate your password"
            });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true });
        // return responce
        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong in Reset Password"
        })
    }
}