const mongoose=require("mongoose");
const RatingAndReview=require("../model/ratingandReview");
const Course =require("../model/Course");

//createRating
exports.createRating = async (req,res) =>{
  try {
    //get userid
    const userId = req.user.id;
    //fetchDATA from req
    const {rating,review,courseId}= req.body || {};
    //cehck if ther user alreadyt exst or not
     // check user enrolled in course or not
    const course = await Course.findOne({
      _id: courseId,
      studentsEnrolled: userId,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }

    // check if user already reviewed this course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by user",
      });
    }

    // create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // update course with rating/review
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Error while creating rating and review",
      error: error.message,
    });
  }
}


// getAverageRating
exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body || {};

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      averageRating: 0,
      message: "No ratings found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching average rating",
      error: error.message,
    });
  }
};


// getAllRating
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching all ratings",
      error: error.message,
    });
  }
};
