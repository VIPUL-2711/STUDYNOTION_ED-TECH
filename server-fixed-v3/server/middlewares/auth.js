const jwt=require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth= (req,res,next)=>{
  try{
    const authHeader = req.headers["authorization"];
    const token = (req.body && req.body.token)
              || (req.cookies && req.cookies.token)
              || (authHeader && authHeader.replace("Bearer ", ""));
    if(!token){
      return res.status(401).json({
        success:false,
        message:"token not found",
      });
    }

    try{
      const decode = jwt.verify(token,process.env.JWT_SECRET);
      req.user=decode;
    }
    catch(error){
        return res.status(401).json({
                success:false,
                message:"token is invalid",
        });
    }
    next();
  }
  catch(error){
      return res.status(500).json({
          success:false,
          message:"error occured while validating token",
      });
  }
}
//isstudent
exports.isStudent = (req,res,next)=>{
    try{

        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Students"
            });
        }

        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        });
    }
}
//isinstuctor
exports.isInstructor = (req,res,next)=>{
    try{

        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructors"
            });
        }

        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        });
    }
}
//isadmin
exports.isAdmin = (req,res,next)=>{
    try{

        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admins"
            });
        }

        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        });
    }
}
