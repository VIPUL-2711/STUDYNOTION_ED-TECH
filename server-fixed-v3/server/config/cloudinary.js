const cloudinary = require("cloudinary").v2; //cloudinary is being required

exports.cloudinaryConnect = () =>{
  try {
    cloudinary.config({
      // configuration the cloudinary to upload media
      cloud_name:process.env.CLOUDNAME,
      api_key:process.env.API_KEY,
      api_secret:process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};
