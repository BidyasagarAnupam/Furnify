const Order = require("../models/Order");

exports.getAllOrders = async(req,res) => {
    try {
        const id = req.user.id;
        const allOrders = await Order.find({user: id}).populate('user')
            .populate('product')
            .populate('address')
            .exec()

     if(!allOrders){
        return res.status(400).json({
            success: false,
            message: "Something went wrong while fetching the order"
        })
     }

     return res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        data: allOrders
     })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error.message,
            message: "Error in retrieving Orders"
        })
    }
}

exports.updateStatus =  async(req,res) => {
    const {orderId, status} = req.body;

    if(!orderId || !status) {
        return res.status(500).json({
            success: false,
            message: "All fields are required"
        })
    }

    const order = await Order.findById({ _id: orderId });

    if(!order){
        return res.status(404).json({
            success: false,
            message: "OrderID is invalid"
        })
    }

     order.status = status;
     order.save();
    
     return res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: order
     })
}

exports.getAllMerchantOrders = async (req, res) => {
    try {
        const id = req.user.id;
        const allOrders = await Order.find({ merchant: id }).populate('user')
            .populate('product')
            .populate('address')
            .exec()

        if (!allOrders) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong while fetching the order"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: allOrders
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error.message,
            message: "Error in retrieving Orders"
        })
    }
}