const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
} = require("../controllers/Profile")

const{
  createAddress,
  updateAddress,
  deleteAddress,
  getAllAddress,
  getFullAddressDetails,
} = require("../controllers/Address")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile",auth, deleteAccount)

//Update User Account
router.put("/updateProfile", auth, updateProfile)

//Get User Details
router.get("/getUserDetails", auth, getAllUserDetails)

//Update Display Picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture)


// ********************************************************************************************************
//                                      Address routes
// ********************************************************************************************************


//Create User Address
router.post("/createAddress", auth, createAddress)

//Update User Address
router.put("/updateAddress", auth, updateAddress)

//Delete User Address
router.delete("/deleteAddress", auth, deleteAddress)

//Get User Address
router.get("/getAllAddress", auth, getAllAddress)

//Get Full Address Details
router.post("/getFullAddressDetails", auth, getFullAddressDetails)


module.exports = router