const mongoose = require('mongoose');
const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const Product = require("../models/Product");

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
            status,
            brand } = req.body;
        //fetch thumbnail
        const thumbnail = await req.files.thumbnailImage;
        //validation
        if (
            !name ||
            !description ||
            !weight ||
            !price ||
            !category ||
            !subCategory ||
            !brand ||
            !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        if (!status || status === undefined) {
            status = 'Draft';
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

        const subCategoryDetails = await subCategory.findById(subCategory);

        if (!subCategoryDetails) {
            return res.status(404).json({
                success: false,
                message: "SubCategory is not valid",
            });
        }

        if (subCategoryDetails.category !== category) {
            return res.status(404).json({
                success: false,
                message: "Category is not valid for the subcategory",
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new product
        const newProduct = await Product.create({
            name,
            description,
            weight,
            price,
            category,
            subCategory,
            status,
            brand,
            image: thumbnailImage.secure_url,
            merchant: merchantDetails._id,
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

        await subCategory.findByIdAndUpdate({
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
        return Response.status(200).json({
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


// get all Products
exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({},
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

//get productDetails
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
            .populate("brand")
            .populate("discount")
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

//edit product
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



    }
    catch (error) {

    }



}