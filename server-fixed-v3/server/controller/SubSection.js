const SubSection=require("../model/SubSection");
const Section= require("../model/Section");
const { uploadtoCloudinary } = require("../utils/imageUpload");

exports.createSubsection=async (req,res)=>{
  try {
    //fetch the data 
    const {sectionId,title,description, timeDuration} = req.body || {};
    //extract the files 
    const video = req.files.videoFile;
    //validation //
    if(!sectionId || !title || !description || !timeDuration || !video){
      return res.status(400).json({
        success:false,
        message:"these feilds are required to fill ",
      });
    }
    //upload to cloudinary
    const uploadDetails=await uploadtoCloudinary(video,process.env.FOLDER_NAME);
    //create db entry 
    const subsectionDetails= await SubSection.create({
      title:title,
      timeDuration:timeDuration,
      description:description,
      videoURL:uploadDetails.secure_url,
    })
    // update section with subsection id
      const updatedSection = await Section.findByIdAndUpdate(
        sectionId,
        {
          $push: {
            subSection: subsectionDetails._id,
          },
        },
        { new: true }
      ).populate("subSection");
    //return res 
    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"something went wrong can't create subsection ",
    });
  }
}

//update subsection
exports.updateSubsection=async (req,res)=>{
  try {
    //fetch data
    const {subSectionId,title,description,timeDuration} = req.body || {};
    //validation
    if(!subSectionId){
      return res.status(400).json({
        success:false,
        message:"subSectionId is required",
      });
    }
    //fetch existing subsection
    const subSection = await SubSection.findById(subSectionId);
    if(!subSection){
      return res.status(404).json({
        success:false,
        message:"subsection not found",
      });
    }
    //update the fields that were provided
    if(title !== undefined){
      subSection.title = title;
    }
    if(description !== undefined){
      subSection.description = description;
    }
    if(timeDuration !== undefined){
      subSection.timeDuration = timeDuration;
    }
    //if a new video was uploaded, replace it
    if(req.files && req.files.videoFile){
      const uploadDetails = await uploadtoCloudinary(req.files.videoFile,process.env.FOLDER_NAME);
      subSection.videoURL = uploadDetails.secure_url;
    }
    await subSection.save();

    // return the parent section (populated) for consistency with createSubsection,
    // so the frontend can refresh state the same way for both
    let updatedSection = null;
    if (req.body.sectionId) {
      updatedSection = await Section.findById(req.body.sectionId).populate("subSection");
    }

    return res.status(200).json({
      success:true,
      message:"SubSection updated successfully",
      data: updatedSection || subSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"something went wrong can't update subsection",
    });
  }
}

//delete subsection
exports.deleteSubsection=async (req,res)=>{
  try {
    //fetch data
    const {subSectionId,sectionId} = req.body || {};
    //validation
    if(!subSectionId){
      return res.status(400).json({
        success:false,
        message:"subSectionId is required",
      });
    }
    //remove the subsection reference from its parent section
    if(sectionId){
      await Section.findByIdAndUpdate(sectionId,{
        $pull:{
          subSection:subSectionId,
        },
      });
    }
    //delete the subsection document itself
    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success:true,
      message:"SubSection deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"something went wrong can't delete subsection",
    });
  }
}
