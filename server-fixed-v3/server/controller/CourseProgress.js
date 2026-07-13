const CourseProgress = require("../model/CourseProgress");
const User = require("../model/users");

// mark a subsection as watched/completed for the logged-in student
exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body || {};
    const userId = req.user.id;

    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "courseId and subSectionId are required",
      });
    }

    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userID: userId,
    });

    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        courseID: courseId,
        userID: userId,
        completedVideos: [subSectionId],
      });
    } else {
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(200).json({
          success: true,
          message: "Subsection already marked as completed",
        });
      }
      courseProgress.completedVideos.push(subSectionId);
      await courseProgress.save();
    }

    return res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
      data: courseProgress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not update course progress",
      error: error.message,
    });
  }
};

// return { courseId: percentComplete } for every course the student is enrolled in
exports.getEnrolledCoursesProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const populatedUser = await User.findById(userId).populate({
      path: "courses",
      populate: {
        path: "courseContent",
        populate: { path: "subSection" },
      },
    });

    if (!populatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const progressMap = {};

    for (const course of populatedUser.courses) {
      const totalLectures = (course.courseContent || []).reduce(
        (acc, section) => acc + (section.subSection?.length || 0),
        0
      );

      const progress = await CourseProgress.findOne({
        courseID: course._id,
        userID: userId,
      });

      const completedCount = progress ? progress.completedVideos.length : 0;

      progressMap[course._id] =
        totalLectures === 0 ? 0 : Math.round((completedCount / totalLectures) * 100);
    }

    return res.status(200).json({
      success: true,
      data: progressMap,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch course progress",
      error: error.message,
    });
  }
};
