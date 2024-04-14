const { instance } = require("../config/razorpay");
const Product = require("../models/Product");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { orderSuccessEmail } = require("../mail/templates/orderSuccessEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const Order = require("../models/Order");
// const ProductProgress = require("../models/ProductProgress");

//initiate the razorpay order
exports.capturePayment = async (req, res) => {

    const { products, totalAmount } = req.body;
    // const userId = req.user.id;

    if (products.length === 0) {
        return res.json({ success: false, message: "Please provide Product Id" });
    }

    // let totalAmount = 0;

    for (const product_id of products) {
        let product;
        try {

            product = await Product.findById(product_id);
            if (!product) {
                return res.status(200).json({ success: false, message: "Could not find the product" });
            }

            // const uid = new mongoose.Types.ObjectId(userId);
            

            // totalAmount += product.price;
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, mesage: "Could not Initiate Order" });
    }

}


//verify the payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const products = req.body?.products;
    const userId = req.user.id;
    const addressId = req.body?.addressId;

    if (!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !products || !userId) {
        return res.status(200).json({ success: false, message: "Payment Failed" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        //enroll karwao student ko
        await registerCustomer(products, addressId, userId, res);
        //return res
        return res.status(200).json({ success: true, message: "Payment Verified", orderId: razorpay_order_id });
    }
    return res.status(200).json({ success: "false", message: "Payment Failed" });

}


const registerCustomer = async (products, addressId, userId, res) => {

    if (!products || !userId) {
        return res.status(400).json({ success: false, message: "Please Provide data for Products or UserId" });
    }

    for (const productId of products) {
        try {
            //find the product and enroll the student in it
            const orderedProduct = await Product.findOneAndUpdate(
                { _id: productId },
                { $push: { users: userId } },
                { new: true },
            )

            if (!orderedProduct) {
                return res.status(500).json({ success: false, message: "Product not Found" });
            }

            // const productProgress = await ProductProgress.create({
            //     productId: productId,
            //     userId: userId,
            //     completedVideos: [],
            // })


            // console.log("ProductProgress", productProgress);

            // create a new order
            const order = await Order.create({
                user: userId,
                product: productId,
                address : addressId,
                status: "Confirmed"
            })

            //find the customer and add the product to their list of orderedProducts
            const customer = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        ordered: order._id,
                    }
                }, { new: true })

            ///bachhe ko mail send kardo
            const emailResponse = await mailSender(
                customer.email,
                `Successfully Purchased  ${orderedProduct.name}`,
                orderSuccessEmail(orderedProduct.name, `${customer.firstName}`)
            )
            console.log("Email Sent Successfully", emailResponse);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }

    try {
        //student ko dhundo
        const customer = await User.findById(userId);
        await mailSender(
            customer.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${customer.firstName}`,
                amount / 100, orderId, paymentId)
        )
    }
    catch (error) {
        console.log("error in sending mail", error)
        return res.status(500).json({ success: false, message: "Could not send email" })
    }
}