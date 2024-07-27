const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const Product = require("../models/Product");
const { getFiltered } = require('../utils/getFilterProducts');
const { deleteProduct } = require('../utils/deleteProduct');
const User = require('../models/User');
const SubCategory = require("../models/SubCategory");
const Order = require("../models/Order");
// import pLimit from 'p-limit';

const pLimit = require('p-limit');

//Only for merchant pov
exports.createProduct = async (req, res) => {
    try {
        //fetch userID
        const userID = req.user.id;
        //fetch the data
        let {
            name,
            description,
            weight,
            price,
            category,
            subCategory,
            discount,
            status,
        } = req.body;

        //fetch thumbnail
        const limit = pLimit(3);
        const thumbnail = await req.files.image;
        const secondaryImages = [];

        // Extract the keys of req.files
        const keys = Object.keys(req.files);

        // Iterate through the keys
        keys.forEach(key => {
            // Check if the key contains "secondaryimage"
            if (key.startsWith('secondaryimage')) {
                // Push the corresponding file data into the array
                secondaryImages.push(req.files[key]);
            }
        });

        console.log("SecondaryImages", secondaryImages);

        
        //validation
        if (
            !name ||
            !description ||
            !weight ||
            !price ||
            !category ||
            !subCategory ||
            !thumbnail ||
            !status) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        //check account type
        const merchantDetails = await User.findById(userID, {
            accountType: "Merchant"
        })

        if (!merchantDetails) {
            return res.status(404).json({
                success: false,
                message: "Merchant details are not found",
            });
        }

        //check category & subcategory
        const categoryDetails = await Category.findById(category);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category is not valid",
            });
        }

        const subCategoryDetails = await SubCategory.findById(subCategory);

        if (!subCategoryDetails) {
            return res.status(404).json({
                success: false,
                message: "SubCategory is not valid",
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        let secondaryImagesLink = [];
        const imagesToUpload = Object.values(secondaryImages).map((image) => {
            return limit(async () => {
                const uploadImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME); // Assuming tempFilePath is used for uploading
                secondaryImagesLink.push(uploadImage.secure_url);
            });
        });

        await Promise.all(imagesToUpload);

        console.log("SecondaryImageLink-->", secondaryImagesLink);

        //create an entry for new product
        const newProduct = await Product.create({
            name: name,
            description: description,
            weight: weight,
            price,
            category: category,
            subCategory: subCategory,
            discount,
            image: thumbnailImage.secure_url,
            secondaryImages: secondaryImagesLink,
            merchant: merchantDetails._id,
            status
        })

        //add new product to the user schema of merchant
        await User.findByIdAndUpdate({
            _id: merchantDetails._id
        },
            {
                $push: {
                    products: newProduct._id,
                }
            },
            { new: true }
        );
        //update category and subcategory
        await Category.findByIdAndUpdate({
            _id: categoryDetails._id
        },
            {
                $push: {
                    products: newProduct._id,
                }
            },
            { new: true }
        );

        await SubCategory.findByIdAndUpdate({
            _id: subCategoryDetails._id
        },
            {
                $push: {
                    products: newProduct._id,
                }
            },
            { new: true }
        );

        //return response
        return res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: newProduct,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating the product",
            error: error.message,
        });
    }
}



// get all Products(Only for Customers)
exports.getAllProducts = async (req, res) => {
    try {
        const query = req.body;
        const filter = getFiltered(query);

        const rating = query.rating === null ? 0 : query.rating;
        console.log("Filter: ", rating);



        const allProducts = await Product.find(
            {
                $and: [
                    filter,
                    { status: "true" } // Adding filter for status
                ]
            },
            {
                name: true,
                price: true,
                image: true,
                discount: true,
                weight: true,
                ratingAndReviews: true,
            })
            .populate({
                path: "ratingAndReviews",
                match: { rating: { $gte: rating } } // Filter reviews with rating greater than or equal to the provided value
            })
            .exec();
        return res.status(200).json({
            success: true,
            data: allProducts,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Product Data`,
            error: error.message,
        });
    }
};

// get new 7 products
exports.getNewProducts = async (req, res) => {
    try {
        const newProducts = await
            Product
                .find({ status: "true" })
                .sort({ createdAt: "desc" })
                .limit(7)
                .populate("ratingAndReviews")
                .exec()

        if (!newProducts) {
            res.status(404).json({
                success: false,
                message: `Can't Fetch Product Data`,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Recent Products are fetched successfully",
            data: newProducts,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Product Data`,
            error: error.message,
        });
    }
}

//get productDetails(Only for Customers and Merchants)
exports.getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(400).json({
                success: false,
                message: `Could not find the product with id ${productId}`,
                data: {}
            })
        }

        const getProductDetails = await Product.find({ _id: productId })
            .populate(
                {
                    path: "merchant",
                    populate: {
                        path: "additionalDetails"
                    },
                }
            )
            .populate("category")
            .populate("subCategory")
            .populate([
                {
                    path: "ratingAndReviews",
                    populate: {
                        path: "user",
                        select: "firstName lastName email image",
                    }
                },
                {
                    path: "ratingAndReviews",
                    populate: {
                        path: "product",
                        select: "name",
                    }
                }
            ])

            .exec();
        console.log("Data is: ", getProductDetails);

        if (!getProductDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the product with id ${productId}`,
            })
        }


        return res.status(200).json({
            success: true,
            message: "Product details fetched successfully",
            data: getProductDetails
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//edit product(only for Merchant)
exports.editProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        //updates contains an object which contains updated details from frontend
        const updates = req.body;

        console.log("UPDATES________", updates);

        const product = await Product.findById(productId);
        console.log("PRODUCT", product.category);
        const cId = product.category
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }

        // If category is changed
        if (updates.category) {
            if (!(updates.category === product.category)) {
                // Remove product id from old category
                await Category.findByIdAndUpdate(
                    {
                        _id: product.category
                    },
                    {
                        $pull: {
                            products: productId,
                        }
                    },
                    { new: true }
                )
                // Push product id from new category
                await Category.findByIdAndUpdate(
                    {
                        _id: updates.category
                    },
                    {
                        $push: {
                            products: productId,
                        }
                    },
                    { new: true }
                )
            }
        }


        // If subcategory is changed
        if (updates.subCategory) {
            if (!(updates.subCategory === product.subCategory)) {
                // Remove product id from old subcategory
                await SubCategory.findByIdAndUpdate(
                    {
                        _id: product.subCategory.toString()
                    },
                    {
                        $pull: {
                            products: productId,
                        }
                    },
                    { new: true }
                )

                // Push product id from new subcategory
                await SubCategory.findByIdAndUpdate(
                    {
                        _id: updates.subCategory
                    },
                    {
                        $push: {
                            products: productId,
                        }
                    },
                    { new: true }
                )
            }
        }


        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("REQUEST KI FILE EDIT K ANDR: ", req.files);
            const limit = pLimit(3);
            const thumbnail = await req.files.image;
            const secondaryImages = [];

            // Extract the keys of req.files
            const keys = Object.keys(req.files);

            // Iterate through the keys
            keys.forEach(key => {
                // Check if the key contains "secondaryimage"
                if (key.startsWith('secondaryimage')) {
                    // Push the corresponding file data into the array
                    secondaryImages.push(req.files[key]);
                }
            });

            console.log("SecondaryImages", secondaryImages);

            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

            let secondaryImagesLink = [];
            const imagesToUpload = Object.values(secondaryImages).map((image) => {
                return limit(async () => {
                    const uploadImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME); // Assuming tempFilePath is used for uploading
                    secondaryImagesLink.push(uploadImage.secure_url);
                });
            });

            await Promise.all(imagesToUpload);

            console.log("SecondaryImageLink-->", secondaryImagesLink);

            product.image = thumbnailImage.secure_url;
            product.secondaryImages = secondaryImagesLink;
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                product[key] = updates[key]
            }
        }

        product.save();

        const getProductDetails = await Product.find({ _id: productId })
            .populate(
                {
                    path: "merchant",
                    populate: {
                        path: "additionalDetails"
                    },
                }
            )
            .populate("category")
            .populate("subCategory")
            .populate("ratingAndReviews")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Course updated successfullyy",
            data: getProductDetails,
        });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

// Get a list of Product for a given Merchant(Only for Merchant)
exports.getMerchantProducts = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const query = req.body;
        console.log("Quert", query);
        const merchantId = req.user.id;


        if (!merchantId) {
            return res.status(500).json({
                success: false,
                message: "Merchant ID not found"
            });
        }

        const filter = getFiltered(query, merchantId);
        console.log("Filter: ", filter);

        // Find all courses belonging to the instructor
        const merchantProducts = await Product.find(filter)
            .populate('category')
            .populate('subCategory')
            .populate("ratingAndReviews")
            .sort({ createdAt: -1 });

        if (!merchantProducts) {
            return res.status(500).json({
                success: false,
                message: "Product Not Found"
            });
        }

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            message: "Filtered products of Merchant",
            data: merchantProducts,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve filtered products",
            error: error.message,
        })
    }
}

// Get a list of Ordered Products for a given Merchant(Only for Merchant)
exports.getOrderedProductsForMerchant = async (req, res) => {
    try {
        const merchantId = req.user.id;
        const orderedItems = await Order.find();
        
    } catch (error) {
        
    }
}

// Delete the Product(Only for Merchant)
exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body

        console.log("Product id", productId);

        await deleteProduct(productId);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}


