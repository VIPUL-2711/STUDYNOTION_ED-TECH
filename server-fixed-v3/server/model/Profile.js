const mongoose=require('mongoose');

const Profile=new mongoose.Schema({
  gender:{
    type:String,
  },
  dateOfBirth:{
    type:String,
  },
  about:{
    type:String,
    trim:true,
  },
  contactNumber:{
    type:Number,
  },
})
module.exports=mongoose.model("Profile",Profile);
