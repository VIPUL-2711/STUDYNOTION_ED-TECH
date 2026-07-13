const User=require("../model/users");
const Course=require("../model/Course");
const CourseProgress=require("../model/CourseProgress");
const {uploadtoCloudinary} = require("../utils/imageUpload");
const Category = require("../model/Category");

exports.createCourse=async (req,res)=>{
  try {
    //fetch data ;
    const { courseName , courseDescription , WhatYouWillLearn , price , category, tag } = req.body || {};

    // fetch thumbnail; 
    const thumbnail = req.files.thumbnailImage;

    // validation 
     
    if(!courseName || !courseDescription || !WhatYouWillLearn || !price || !category || !thumbnail){
      return res.status(400).json({
        success:false,
        message:"all feilds are requried to fill",
      });
    }
    // check for the insrtuctor
    const userID= req.user.id;
    const instructorDetails = await User.findById(userID);
    console.log("instructore detail",instructorDetails);

    if(!instructorDetails){
      return res.status(404).json({
        success:false,
        message:"instructore  details not found",
      });
    }

    //check for the category 

    const categoryDetails=await Category.findById(category);
    if(!categoryDetails){
      return res.status(404).json({
        success:false,
        message:"category details not found",
      });
    }

    //upload image to cloudinary
    const thumbnailDetails=await uploadtoCloudinary(thumbnail,process.env.FOLDER_NAME);

    // create entry in db
    const courseEntry = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      WhatYouWillLearn,
      price,
      tag: tag || [],
      category: categoryDetails._id,
      thumbnail: thumbnailDetails.secure_url,
    });

    // add course to instructor
    await User.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: {
          courses: courseEntry._id,
        },
      },
      { new: true }
    );

    // add course to category
    await Category.findByIdAndUpdate(
      categoryDetails._id,
      {
        $push: {
          courses: courseEntry._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: courseEntry,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"something went wrong ",
      error:error.message,
    })
  }
}


//fetch all the course 

exports.getAllCourses=async (req,res)=>{
  try {
    const fetchDetails= await Course.find({},{
                                              courseName:true,
                                              price:true,
                                              thumbnail:true,
                                              instructor:true,
                                              ratingAndReviews:true,
                                              studentsEnrolled:true,
                                            }).populate("instructor").exec();
                      
    return res.status(200).json({
      success:true,
      message:"fetched all the details",
      data:fetchDetails,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"not fetched all the detials",
      error:error.message,
    })
  }
}

//get all course detail 
exports.getCourseDetails = async (req,res) =>{
  try {
    //get id 
    const {courseId} = req.body || {};
    //now populate all details 
    const courseDetail= await Course.findOne(
                                          {_id:courseId})
                                          .populate(
                                            {
                                              path:"instructor",
                                              populate:{
                                                path:"additionalDetails",   
                                              },
                                            }
                                          )
                                          .populate("category")
                                          .populate("ratingAndReviews")
                                          .populate({
                                            path:"courseContent",
                                            populate:{
                                              path:"subSection",  
                                            },
                                          })
                                          .exec();
    //VALIDATION
    if(!courseDetail){
      return res.status(400).json({
        success:false,
        message:`could not find any course with ${courseId}`,
      });
    }
    //return response
    return res.status(200).json({
      success:true,
      message:"course detailes fetched successfully",
      data:courseDetail,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
    });
  }
}

//get full course details (includes progress info, used for enrolled/logged-in view)
exports.getFullCourseDetails = async (req,res) =>{
  try {
    const {courseId} = req.body || {};

    const courseDetails = await Course.findOne({_id:courseId})
                                        .populate({
                                          path:"instructor",
                                          populate:{
                                            path:"additionalDetails",
                                          },
                                        })
                                        .populate("category")
                                        .populate("ratingAndReviews")
                                        .populate({
                                          path:"courseContent",
                                          populate:{
                                            path:"subSection",
                                          },
                                        })
                                        .exec();

    if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`could not find any course with ${courseId}`,
      });
    }

    // only the enrolled students or the course's own instructor may view full content
    const isEnrolled = courseDetails.studentsEnrolled?.some(
      (studentId) => studentId.toString() === req.user.id
    );
    const isOwner = courseDetails.instructor?._id?.toString() === req.user.id;

    if (!isEnrolled && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    let completedVideos = [];
    if(req.user && req.user.id){
      const courseProgress = await CourseProgress.findOne({
        courseID: courseId,
        userID: req.user.id,
      });
      completedVideos = courseProgress ? courseProgress.completedVideos : [];
    }

    return res.status(200).json({
      success:true,
      message:"course full details fetched successfully",
      data:{
        courseDetails,
        completedVideos,
      },
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
    });
  }
}

//edit course
exports.editCourse = async (req,res) => {
  try {
    const {courseId} = req.body || {};
    const course = await Course.findById(courseId);

    if(!course){
      return res.status(404).json({
        success:false,
        message:"course not found",
      });
    }

    // if a new thumbnail was uploaded, replace it
    if(req.files && req.files.thumbnailImage){
      const thumbnail = req.files.thumbnailImage;
      const thumbnailDetails = await uploadtoCloudinary(thumbnail,process.env.FOLDER_NAME);
      course.thumbnail = thumbnailDetails.secure_url;
    }

    // update any provided text fields
    const updatableFields = ["courseName","courseDescription","WhatYouWillLearn","price","tag","status","category"];
    for(const field of updatableFields){
      if(req.body[field] !== undefined){
        course[field] = req.body[field];
      }
    }

    await course.save();

    const updatedCourse = await Course.findById(courseId)
                                        .populate("instructor")
                                        .populate("category")
                                        .populate("ratingAndReviews")
                                        .populate({
                                          path:"courseContent",
                                          populate:{
                                            path:"subSection",
                                          },
                                        })
                                        .exec();

    return res.status(200).json({
      success:true,
      message:"course updated successfully",
      data:updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
    });
  }
}

//get all courses under a specific instructor
exports.getInstructorCourses = async (req,res) => {
  try {
    const instructorId = req.user.id;

    const instructorCourses = await Course.find({instructor:instructorId}).sort({createdAt:-1});

    return res.status(200).json({
      success:true,
      message:"instructor courses fetched successfully",
      data:instructorCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"could not fetch instructor courses",
      error:error.message,
    });
  }
}

//delete a course
exports.deleteCourse = async (req,res) => {
  try {
    const {courseId} = req.body || {};

    const course = await Course.findById(courseId);
    if(!course){
      return res.status(404).json({
        success:false,
        message:"course not found",
      });
    }

    // remove course reference from enrolled students
    const studentsEnrolled = course.studentsEnrolled || [];
    for(const studentId of studentsEnrolled){
      await User.findByIdAndUpdate(studentId,{
        $pull:{courses:courseId},
      });
    }

    // remove course reference from instructor
    await User.findByIdAndUpdate(course.instructor,{
      $pull:{courses:courseId},
    });

    // remove course reference from its category
    await Category.findByIdAndUpdate(course.category,{
      $pull:{courses:courseId},
    });

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success:true,
      message:"course deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"could not delete course",
      error:error.message,
    });
  }
}
