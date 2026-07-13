const Section = require("../model/Section");
const Course = require("../model/Course");
const SubSection = require("../model/SubSection");

exports.createSection = async (req, res) => {
  try {
    //data fetch from req.body;
    const { sectionName, courseId } = req.body || {};
    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "sectionName and courseId are required",
      });
    }
    //create entry in db
    const newSection = await Section.create({ sectionName });
    //update course with section id
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    //return res,
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "not create section , something went wrong",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId, courseId } = req.body || {};
    // validation
    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "sectionName, sectionId and courseId are required",
      });
    }
    // update document
    await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

    // return the updated course so the frontend can refresh its state,
    // consistent with what createSection returns
    const updatedCourseDetails = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "section updated successfully",
      data: updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "not upadted section name , something went wrong",
      error: error.message,
    });
  }
};

// delete section
exports.deleteSection = async (req, res) => {
  try {
    //data fetch
    const { sectionId, courseId } = req.body || {};

    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "sectionId and courseId are required",
      });
    }

    // remove the section reference from its parent course
    await Course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });

    // find the section so we can clean up its lectures too
    const section = await Section.findById(sectionId);
    if (section) {
      // delete every subsection (lecture) that belonged to this section
      await SubSection.deleteMany({ _id: { $in: section.subSection } });
    }

    // delete the section itself
    await Section.findByIdAndDelete(sectionId);

    // return the updated course so the frontend can refresh its state
    const updatedCourseDetails = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "deleted succesfully ",
      data: updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "not deleted section name , something went wrong",
      error: error.message,
    });
  }
};
