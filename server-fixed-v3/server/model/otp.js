const mongoose=require('mongoose');
const mailSender = require('../utils/mailSender');
const emailVerificationTemplate = require('../email/templates/emailVerificationTemplate');
const OTPSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    trim:true,
  },
  otp:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
    expires:5*60,
  },
})



//a function for sending mail

async function sendverificationEmail(email,otp) {
  try{
    const mailResponse=await mailSender(email,"Verification Email from StudyNotion",emailVerificationTemplate(otp));
    console.log("email sent succesfully ",mailResponse);
    
  }
  catch(error){
    console.log("error occur while sending mail",error);
    throw error;
  }
  
}

OTPSchema.pre("save", async function(next) {

    console.log("New document saved to database");

    if(this.isNew){
        await sendverificationEmail(this.email, this.otp);
    }
});
module.exports=mongoose.model("OTP",OTPSchema);