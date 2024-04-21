const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const deleteProduct = require('../utils/deleteProductHelpingFun')
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubCategory = async(req,res)=>{
    try{
        //fetch data
        console.log("REQ.BODY", req.body);
        console.log("req.files", req.files);
        const {name,cid}= req.body;
        const subCategoryImage = req.files.image;
        //validation
        if(!name || !cid || !subCategoryImage){
            return res.status(403).json({
                success: false,
                message:"All fields are required",
            });
        }

        const subCategory = await SubCategory.find({name})

        // if subCategory is already present with the same name than dont create it.
        if(subCategory.length!==0) {
            return res.status(400).json({
                success: false,
                message:"This sub category is already present",
            })
        }
        
        const image = await uploadImageToCloudinary(
            subCategoryImage,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        const subCategoryDetails = await SubCategory.create({name, image: image.secure_url, category: cid})
        
        await Category.findByIdAndUpdate(cid, {
            $push: {
                subCategory: subCategoryDetails._id
            }
        })

        return res.status(200).json({
            success: true,
            message: "subCategory created successfully",
            data: subCategoryDetails
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in creating subCategory"
        })
    }
}

exports.updateSubCategory = async(req,res) =>{
    try {
        const { name, subId } = req.body;
        

        const subCategory = await SubCategory.findOne({name})

        // console.log("subCategory", subCategory);
        // if subCategory is already present with that name than dont create it.
        if(subCategory) {
            return res.status(400).json({
                success: false,
                message:"This sub category is already present",
            })
        }


        const updateSubCategory = await SubCategory.findById(subId)

        if (req?.files?.image) {
            console.log("IMAGE", req.files);
            const subCategoryImage = req.files.image;
            const image = await uploadImageToCloudinary(
                subCategoryImage,
                process.env.FOLDER_NAME,
                1000,
                1000
            )
            updateSubCategory.image = image.secure_url
        }
        
        if (name) {
            updateSubCategory.name = name;
        }
        
        
        updateSubCategory.save();

        return res.status(200).json({
            success: true,
            message: "subCategory updated successfully",
            data: updateSubCategory
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in updateing subCategory"
        })
    }
}

exports.deleteSubCategory = async (req, res) => {
    try {
        const {subId} =  req.body;

        if(!subId){
            return res.status(403).json({
                success: false,
                message:"Sub Category id not present",
            });
        }

        const subCategoryDetails = await SubCategory.findById(subId);

        const cid = subCategoryDetails.category;

        // Now we Delete all the Product from that subCategory
        subCategoryDetails.products.forEach( async (productId) => {
            await deleteProduct(productId, cid, subId);
        });

        await Category.findByIdAndUpdate(cid, {
            $pull : {
                subCategory : subId
            }
        })

        // Delete the SubCategory
        await SubCategory.findByIdAndDelete(subId); 
        
        return res.status(200).json({
            success: true,
            message: "subCategory updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in deleting subCategory"
        })
        
    }
}

exports.getSubCategory = async (req, res) => {
    try {
        const {cid} = req.headers;

        if(!cid){
            return res.status(403).json({
                success: false,
                message:"Category id id not present for subcategory",
            });
        }

        const subCategoryDetails = await SubCategory.find({category : cid});

        return res.status(200).json({
            success: true,
            message: "subCategory fetch successfully",
            data: subCategoryDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error.message,
            message : "Error in fetching subCategory"
        })
    }
}