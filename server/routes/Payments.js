// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments")
const { auth, isMerchant, isCustomer, isAdmin } = require("../middleware/auth")
router.post("/capturePayment", auth, isCustomer, capturePayment)
router.post("/verifyPayment", auth, isCustomer, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isCustomer, sendPaymentSuccessEmail);

module.exports = router