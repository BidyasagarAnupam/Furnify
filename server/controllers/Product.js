const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const Product = require("../models/Product");
const { getFiltered } = require('../utils/getFilterProducts');
const { deleteProduct } = require('../utils/deleteProduct');
const User = require('../models/User');
const SubCategory = require("../models/SubCategory");


//Only for merchant pov
exports.createProduct = async (req, res) => {
    try {
        //fetch userID
        const userID = req.user.id;
        //fetch the data
        let {
            productName,
            productDesc,
            dimension,
            price,
            productCategory,
            productSubCategory,
            discount,
            status,
        } = req.body;
        //fetch thumbnail
        const thumbnail = await req.files.productImage;
        //validation
        if (
            !productName ||
            !productDesc ||
            !dimension ||
            !price ||
            !productCategory ||
            !productSubCategory ||
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
        const categoryDetails = await Category.findById(productCategory);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category is not valid",
            });
        }

        const subCategoryDetails = await SubCategory.findById(productSubCategory);

        if (!subCategoryDetails) {
            return res.status(404).json({
                success: false,
                message: "SubCategory is not valid",
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        var sts;
        if (status) {
            sts = "Published"
        } else {
            sts = "Unpublished";
        }
        //create an entry for new product
        const newProduct = await Product.create({
            name: productName,
            description: productDesc,
            weight: dimension,
            price,
            category: productCategory,
            subCategory: productSubCategory,
            discount,
            image: thumbnailImage.secure_url,
            merchant: merchantDetails._id,
            status: sts
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

        const { query } = req.body;
        const filter = getFiltered(query);

        const allProducts = await Product.find(
            {
                $and: [
                    filter,
                    { status: "Published" } // Adding filter for status
                ]
            },
            {
                name: true,
                price: true,
                thumbnail: true,
                discount: true,
                weight: true,
                ratingAndReviews: true,
            })
            .populate("ratingAndReviews")
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
                .find()
                .sort({ createdAt: "desc" })
                .limit(7);

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

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }

        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            product.image = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (key === 'status') {
                if (updates[key]) {
                    product[key] = "Published"
                } else {
                    product[key] = "Unpublished"
                }
            }
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
        const { query } = req.body;
        const merchantId = req.user.id;

        const filter = getFiltered(query, merchantId);

        // Find all courses belonging to the instructor
        const merchantProducts = await Product.find(filter).sort({ createdAt: -1 });

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

// Delete the Product(Only for Merchant)
exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body

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


