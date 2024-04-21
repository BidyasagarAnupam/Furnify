const express = require("express")
const router = express.Router()

const { getAllOrders, updateStatus, getAllMerchantOrders } = require("../controllers/Order")
const { auth, isCustomer, isMerchant } = require("../middleware/auth")

router.post("/my-orders", auth, isCustomer, getAllOrders)
router.post("/merchant-orders", auth, isMerchant, getAllMerchantOrders)
router.put("/update-order", auth, isMerchant, updateStatus)

module.exports = router