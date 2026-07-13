const Profile=require("../model/Profile");
const User= require("../model/users");

exports.updateProfile= async (req,res) =>{
  try {
   //fetcht the data
   const {dateOfBirth="",about="",contactNumber,gender}=req.body || {};
   //get userid
   const id = req.user.id;
   //validation
   if(!contactNumber || !gender || !id){
    return res.status(400).json({
      success:false,
      message:"all feilds are requiered to fill"
    })
   }
   //find profile
   const userDetails=await User.findById(id);
   const profileId=userDetails.additionalDetails;
   const profileDetails=await Profile.findById(profileId);
   //update profile ;
   profileDetails.dateOfBirth=dateOfBirth;
   profileDetails.about=about;
   profileDetails.gender=gender;
   profileDetails.contactNumber=contactNumber;
   await profileDetails.save();

   //return res
   return res.status(200).json({
    success:true,
    message:"succesfylly updated user profile",
   })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"something went wrong while upadting profile",
    });
  }
}

//delete account


exports.deleteAccount = async (req, res) => {
  try {
    // Get user id
    const id = req.user.id;

    // Check user exists
    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete profile
    await Profile.findByIdAndDelete(userDetails.additionalDetails);

    // Delete user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message,
    });
  }
};

//get all user detailes

exports.getAllUserDetails = async (req, res) => {
  try {
    // Get user id from token
    const id = req.user.id;

    // Find user and populate profile details and enrolled courses
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .populate({
        path: "courses",
        populate: {
          path: "instructor",
        },
      });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};
