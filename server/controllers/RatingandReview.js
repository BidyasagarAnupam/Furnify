const RatingAndReview = require("../models/RatingAndReview")
const Product = require('../models/Product')
const mongoose = require("mongoose")

// Create a new rating and review
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id
    const { rating, review, productId, title } = req.body

    // Check if the user is enrolled in the course

    const productDetails = await Product.findOne({
      _id: productId,
      users: { $elemMatch: { $eq: userId } },
    })

    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: "Customer is not purchased this product",
      })
    }

    // Check if the user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      product: productId,
    })

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Product already reviewed by Customer",
      })
    }

    // Create a new rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      product: productId,
      user: userId,
      title
    })

    // Add the rating and review to the course
    await Product.findByIdAndUpdate(productId, {
      $push: {
        ratingAndReviews: ratingReview,
      },
    })
    await productDetails.save()

    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// Get all rating and reviews
exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
      })
      .populate({
        path: "product",
        select: "name", //Specify the fields you want to populate from the "Product" model
      })
      .exec()

    res.status(200).json({
      success: true,
      data: allReviews,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the course",
      error: error.message,
    })
  }
}

// Get rating and review for particular product
exports.getProductRatingReview = async (req, res) => {
  try {
    const {productId} = req.body;

    if(!productId) {
      return res.status(404).json({
        success: false,
        message: "Product ID is required"
      })
    }

    const allReviews = await RatingAndReview.find({product:productId})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
      })
      .populate({
        path: "product",
        select: "name", //Specify the fields you want to populate from the "Product" model
      })
      .exec()

    res.status(200).json({
      success: true,
      data: allReviews,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the product",
      error: error.message,
    })
  }
}
