const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const deleteProduct = require('../utils/deleteProductHelpingFun')
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createCategory = async(req,res)=>{
    try{
        //fetch data
        const {name} = req.body;
        const categoryImage = req.files.categoryImage;
        //validation
        if(!name || !categoryImage){
            return res.status(403).json({
                success: false,
                message:"All fields are required",
            });
        }

        const category = await Category.find({name});
        console.log("Category", category)
        // if Category is already present with the same name than dont create it.
        if(category.length!==0) {
            return res.status(400).json({
                success: false,
                message:"This category is already present",
            })
        }

        const image = await uploadImageToCloudinary(
            categoryImage,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        const categoryDetails = await Category.create({name, image: image.secure_url})

        return res.status(200).json({
            success: true,
            message: "Category created successfully",
            data: categoryDetails
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in creating category"
        })
    }
}

exports.updateCategory = async(req,res) =>{
    try {
        const {cid} = req.body;
        const updates = req.body

        const category = await Category.find(cid);

        if(!category){
            return res.status(400).json({
                error: "Category not found" 
            })
        }

        if(req.files){
            const thumbnail = req.files.categoryImage
            const categoryImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
              )
            category.image = categoryImage.secure_url
        }

        if(updates.name){
            category.name = updates.name;
        }

        await category.save();

        const updateCategoryDetails = await Category.findOne({_id: cid});

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updateCategoryDetails
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in updating Category"
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const {cid} =  req.body;

        const categoryDetails = await Category.findById(cid);

        categoryDetails.subCategory.forEach( async (subCategoryId) => {

            // /fetch the subcategory details from one category
            const subCategoryDetails = SubCategory.findById(subCategoryId);

            // Now we Delete all the Product from that subCategory
            subCategoryDetails.products.forEach( async (productId) => {
                await deleteProduct(productId, cid, subCategoryId);
            });

            // Delete the SubCategory
            await SubCategory.findByIdAndDelete(subCategoryId);
        });        

        // category deleted successfully
        await Category.findByIdAndDelete(cid);
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in deleting Category"
        })
        
    }
}

exports.getAllCategory = async (req,res) => {
    try{
        const categoryDetails = await Category.find({}).populate("subCategory");
        // console.log("Category Details from backend: ", categoryDetails);
       return res.status(200).json({
        success:true,
        message:"All Categories returned successfully",
        data: categoryDetails,
       });

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in retrieving Category"
        })
    }
}