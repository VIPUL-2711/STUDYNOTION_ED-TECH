const crypto = require("crypto");
const mongoose = require("mongoose");
const {instance}=require("../config/razerpay");
const Course = require("../model/Course")
const User = require("../model/users");
const courseEnrollmentEmail=require("../email/templates/courseEnrollmentEmail");
const mailsender=require("../utils/mailSender");

exports.capturePayment= async (req,res) =>{
  try {
    //get user id and course id
    const {course_id}=req.body || {};
    const user_id=req.user.id;
    //validation on ids
    if(!course_id){
      return res.status(400).json({
        success:false,
        message:"course id is not valid please provide some valid course id ",
      });
    }
    //valid course detials
    let course ;
    try {
        course = await Course.findById(course_id);
        if(!course){
          return res.status(404).json({
            success:false,
            message:"could not found the course",
          });
        }

        // usewr already pay for the same course
        const uid = new mongoose.Types.ObjectId(user_id);
        if(course.studentsEnrolled.includes(uid)){
          return res.status(200).json({
            success:false,
            message:'student is alredy enrolled',
          });
        }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:error.message,
      });
    }
    //create order
    const amount =course.price;
    const currency ="INR";
    //create option
    const option = {
      amount: amount*100,
      currency,
      receipt:"rcpt_"+Date.now(),
      notes:{
        course_id:course_id,
        user_id,
      }
    };
     //initited payment
     try {
      //initiate the payment using razorpay
      const paymentResponse=await instance.orders.create(option);
      console.log(paymentResponse);
      //return response
      return res.status(200).json({
        success:true,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        thumbnail:course.thumbnail,
        orderId:paymentResponse.id,
        currency:paymentResponse.currency,
        amount:paymentResponse.amount,
      });
     } catch (error) {
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"could not initiate order",
        })
     }

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"something went wrong while payment call",
      error:error.message,
    });
  }
}

//verify the payment after the user completes checkout on the frontend
//expects razorpay_order_id, razorpay_payment_id, razorpay_signature and course_id from the client
exports.verifySignature = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      course_id,
    } = req.body || {};

    const user_id = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !course_id) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing",
      });
    }

    // recompute the expected signature using our key secret
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment could not be verified, signature mismatch",
      });
    }

    // signature is valid - enroll the student in the course
    const updatedCourse = await Course.findByIdAndUpdate(
      course_id,
      {
        $push: {
          studentsEnrolled: user_id,
        },
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      {
        $push: {
          courses: course_id,
        },
      },
      { new: true }
    );

    // send enrollment confirmation email (best-effort)
    try {
      if (updatedUser && updatedCourse) {
        await mailsender(
          updatedUser.email,
          "Course Enrollment Confirmation",
          courseEnrollmentEmail(`${updatedUser.firstName} ${updatedUser.lastName}`, updatedCourse.courseName)
        );
      }
    } catch (mailError) {
      console.log("could not send enrollment email", mailError);
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified and user enrolled",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
