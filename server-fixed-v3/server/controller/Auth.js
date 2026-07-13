const User=require("../model/users");
const OTP=require("../model/otp");
const otpGenerator=require("otp-generator");
const Profile=require("../model/Profile");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mailSender=require("../utils/mailSender");
const passwordUpdated=require("../email/templates/passwordUpdate");


require("dotenv").config();

// send otp
exports.sendOTP= async (req,res)=>{
  try{
    // fetch email from request body
    const { email } = req.body || {};
    //check user entry in db it is present or not
    const checkUser = await User.findOne({email});

    //check user exsit or not ;
    if(checkUser){
      return res.status(401).json({
        success:false,
        message:'User already exist '
      })
    }
    //generate otp
    let otp = otpGenerator.generate(6,{
      upperCaseAlphabets:false,
      lowerCaseAlphabets:false,
      specialChars:false
    })

    let result = await OTP.findOne({ otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            result = await OTP.findOne({ otp });
        }

        console.log("Generated OTP:", otp);

        // Save OTP in DB
        const otpPayload = { email, otp };
        await OTP.create(otpPayload);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

  }
  catch(error){
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Failed to send OTP"
    })
  }
}

// sign up

//1  . data fetch from body
exports.signUp=async (req,res)=>{
    try{
       const {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          accountType,
          contactNumber,
          otp
        }= req.body || {};

        // 2. validate data
        if(!firstName || !lastName || !password || !email || !confirmPassword || !otp){
          return res.status(403).json({
            success:false,
            message:"All feilds are required",
          })
        }

        //3 . password 2 both

        if(password !== confirmPassword){
          return res.status(400).json({
            success:false,
            message:"password and confirm password are not matched ,, please re-enter the correct password"
          });
        }
        // 4. check user exit ;
        const existingUser = await User.findOne({email});
        if(existingUser){
          return res.status(400).json({
            success:false,
            message:"User already exist",
          });
        }

        //5. most recent otp
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);
        //validate;
        if(recentOTP.length==0){
          return res.status(400).json({
            success:false,
            message:"otp not found"
          });
        }else if(otp !== recentOTP[0].otp){
          return res.status(400).json({
            success:false,
            message:"invalid otp",
          });
        }

        //6 . hashing of password
        const hashedPassword = await bcrypt.hash(password,10);
        //7 entry in db;
        const ProfileDetails=await Profile.create({
          gender:null,
          dateOfBirth:null,
          about:null,
          contactNumber:null,
        });

        const user =await User.create({
          firstName,
          lastName,
          email,
          password:hashedPassword,
          contactNumber,
          accountType,
          additionalDetails:ProfileDetails._id,
          image: `https://api.dicebear.com/10.x/initials/svg?seed=${firstName}${lastName}`,
        })

        return res.status(200).json({
          success:true,
          message:"user registered successfulyy",
          user,
        })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"user cannnot be registered please try again"
    })

  }
}
// log in
exports.logIn=async (req,res)=>{
  //fetch data;
  try{
    const {email , password} = req.body || {};

    // validate;
    if(!email || !password){
      return res.status(403).json({
        success:false,
        message:"all feild are required , please try again"
      });
    }
    // check user alredy exist
    const existUser=await User.findOne({email}).populate("additionalDetails");
    if(!existUser){
      return res.status(401).json({
        success:false,
        message:"user is not registerd ,, please registerd "
      });
    }
    //generate jwt
    if(await bcrypt.compare(password, existUser.password)){
      const payload={
        email:existUser.email,
        id:existUser._id,
        accountType:existUser.accountType,
      }
      const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h",
      });
      existUser.token =token;
      existUser.password=undefined;

    //create cookie;
      const option = {
        expires:new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true,
      }
      res.cookie("token",token,option).status(200).json({
        success:true,
        token,
        existUser,
        message:'Logged in succesfully'
    })
    }
    else {
      return res.status(401).json({
        success:false,
        message:'password is incorrect'
      });
    }
  }
  catch (error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'loggin failure, please try again'
    });
  }
}
// change password
exports.changePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword, confirmPassword } = req.body || {};

        // Check all fields
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check new password and confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match"
            });
        }

        // Get logged-in user
        const user = await User.findById(req.user.id);

        // Check old password
        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await User.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword }
        );

        // Send confirmation email (best-effort, don't fail the request if this errors)
        try {
            await mailSender(
                user.email,
                "Password Updated Successfully",
                passwordUpdated(user.firstName)
            );
        } catch (mailError) {
            console.log("could not send password update email", mailError);
        }

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error while changing password"
        });
    }
};
