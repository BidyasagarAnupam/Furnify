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
        const { address, city, state, country, zipCode, name, contactNumber, addressType } = req.body;

        // fetch the user
        const id = req.user.id;

        // data validation
        if (!address || !city || !state || !country || !zipCode || !name || !contactNumber || !addressType) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // find profile
        let userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // create the new address
        const newAddressDetails = {
            address: address,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
            name: name,
            contactNumber: contactNumber,
            addressType: addressType
        };

        // Create a new address
        const newAddress = await Address.create({
            user: id,
            ...newAddressDetails,
        });

        // Add the new address to the profile's addressDetails array
        profileDetails.addressDetails.push(newAddress);

        // Save the updated profile details
        await profileDetails.save();

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
        const { address, city, state, country, zipCode, addressId, name, contactNumber, addressType } = req.body;
        // get userId(From Cookies)
        const id = req.user.id;
        // verify data
        if (!address || !city || !state || !country || !zipCode || !addressId || !name || !contactNumber || !addressType) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // find profile
        let userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);


        // Find the index of the address you want to update within the array
        const addressIndex = profileDetails.addressDetails.
            findIndex(address => address._id.toString() === addressId);
        
        // If the address is found, update its details
        if (addressIndex !== -1) {
            const addressToUpdate = profileDetails.addressDetails[addressIndex];

            addressToUpdate.address = address;
            addressToUpdate.city = city;
            addressToUpdate.state = state;
            addressToUpdate.country = country;
            addressToUpdate.zipCode = zipCode;
            addressToUpdate.name = name;
            addressToUpdate.contactNumber = contactNumber;
            addressToUpdate.addressType = addressType;

            // Save the updated profile details
            //! Update User extra
            userDetails.firstName = firstName;
            userDetails.lastName = lastName;
            await userDetails.save();
            await profileDetails.save();
        } else {
            // Handle the case where the address is not found
            console.log('Address not found in profile details.');
            return res.status(400).json({
                success: false,
                message: "Address not found in profile details."
            });
        }

        

        // await profileDetails.save();
        userDetails = await User.findById(id).populate({
            path: "additionalDetails",
            populate: {
                path: "addressDetails"
            }
        }).exec();

        // return responce
        return res.status(200).json({
            success: true,
            message: "Address Updated Successfully Updated",
            // profilDetails,
            data: userDetails
        });
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
            error : error.message
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
        data : allAddresses,
        message: "User registered successfully",
    });

}