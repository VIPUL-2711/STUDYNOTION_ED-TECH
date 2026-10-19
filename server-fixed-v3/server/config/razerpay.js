const razorpay = require("razorpay");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

exports.instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_SECRET || "rzp_secret_placeholder",
});