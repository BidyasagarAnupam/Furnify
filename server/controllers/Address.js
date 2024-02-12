const Address = require('../models/Address');
const User = require('../models/User');
const Profile = require('../models/Profile');

//TODO: DO IN FRONTEND Function to check the zipCode is valid or not
// const zipCodeCheck = async (zipCode) => {
//     // Fetach API
//     const responce = await fetch(`https://api.postalpincode.in/pincode/${zipCode}`);
//     const data = await responce.json();

//     if (data[0].Status === "Error") {
//         return res.status(400).json({
//             success: false,
//             message: "ZIP code is not valid"
//         });
//     }
// }

// Create a new Address
exports.createAddress = async (req, res) => {
    try {
        // Fetch the data
        const { address, city, state, zipCode, name, contactNumber, addressType, locality } = req.body;

        console.log("FROM BACKEND ", address, city, state, zipCode, name, contactNumber, addressType, locality);
        // fetch the user
        const id = req.user.id;

        // data validation
        if (!address || !city || !state || !zipCode || !name || !contactNumber || !addressType || !locality) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // find profile
        let userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // TODO: Delete the null addesss

        // create the new address
        const newAddressDetails = {
            address: address,
            city: city,
            state: state,
            zipCode: zipCode,
            name: name,
            contactNumber: contactNumber,
            addressType: addressType,
            locality: locality
        };

        // Create a new address
        const newAddress = await Address.create({
            user: id,
            ...newAddressDetails,
        });

        console.log("New Address is : ", newAddress);

        // Add the new address to the profile's addressDetails array
        profileDetails.addressDetails.push(newAddress._id);

        // Save the updated profile details
        const updatedProfile = await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: "Address created successfully",
            data: newAddress,
            updatedProfile: updatedProfile
        })

        // return respince
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the address",
            error: error.message
        });
    }
}

// update Address
exports.updateAddress = async (req, res) => {
    try {
        // get data
        const { addressId } = req.body;
        const updates = req.body;

        // get userId(From Cookies)
        const id = req.user.id;
        // verify data

        // find profile
        let userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);


        // Find the index of the address you want to update within the array
        const addressIndex = profileDetails.addressDetails.
            findIndex(address => address._id.toString() === addressId);

        // If the address is found, update its details
        let updatedAddress;
        if (addressIndex !== -1) {
            const addressToUpdateId = profileDetails.addressDetails[addressIndex];
            const addressDetail = await Address.findById(addressToUpdateId)

            // Update only the fields that are present in the request body
            for (const key in updates) {
                if (updates.hasOwnProperty(key)) {
                    addressDetail[key] = updates[key]
                }
            }

            await addressDetail.save();

            const updatedAddress = await Address.findOne({ _id: addressDetail })
            return res.status(200).json({
                success: true,
                message: "Address updated successfully",
                data: updatedAddress,
            })

        } else {
            return res.status(400).json({
                success: false,
                message: "Address details not updated."
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Delete new Address
exports.deleteAddress = async (req, res) => {
    try {

        const { addressId } = req.body;
        // get userId(From Cookies)
        const id = req.user.id;

        // find profile
        let userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // Find the index of the address you want to update within the array
        const addressIndex = profileDetails.addressDetails.
            findIndex(address => address._id.toString() === addressId);

        if (addressIndex !== -1) {

            // Delete the address from the Address Model
            await Address.findByIdAndDelete(addressId);

            // Remove the address from the profile's addressDetails array
            profileDetails.addressDetails.splice(addressIndex, 1);

            // Save the updated profile
            await profileDetails.save();

            // await profileDetails.save();
            const data = await User.findById(id).populate({
                path: "additionalDetails",
                populate: {
                    path: "addressDetails",
                }
            }).exec();

            return res.status(200).json({
                success: true,
                data,
                message: "User registered successfully",
            });

        } else {
            // Handle the case where the address is not found
            console.log('Address not found in profile details.');
            return res.status(400).json({
                success: false,
                message: "Address not found in profile details."
            });
        }


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while deleting the address",
            error: error.message
        });
    }
}

// Get All the Address
exports.getAllAddress = async (req, res) => {
    // get userId(From Cookies)
    const id = req.user.id;

    const allAddresses = await Address.find({ user: id });

    return res.status(200).json({
        success: true,
        data: allAddresses,
        message: "All addresses fetched successfully",
    });

}

//Get full address detail
exports.getFullAddressDetails = async (req, res) => {

    try {
        const { addressId } = req.body;

        console.log("THE REQ.BODY ", req.body)
        if (!addressId) {
            return res.status(400).json({
                success: false,
                message: "Give a valid addressId to fetch address details"
            })
        }

        const getAddressDetails = await Address.findById(addressId)

        if (!getAddressDetails) {
            return res.status(500).json({
                success: false,
                message: "Address details not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Address details fetched successfullly",
            data: getAddressDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while Fetching Address Details"
        })
    }
}