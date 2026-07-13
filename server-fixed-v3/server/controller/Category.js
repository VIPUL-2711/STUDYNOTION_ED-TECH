const category = require("../model/Category");

// createCategory
exports.createCategory = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body || {};

    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create DB entry
    const categoryEntry = await category.create({
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: categoryEntry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getAllCategories
exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await category.find(
      {},
      {
        name: true,
        description: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const Course = require("../model/Course");

// Category Page Details
exports.categoryPageDetails = async (req, res) => {
  try {
    // Get category id
    const { categoryId } = req.body || {};

    // Get selected category and populate courses
    const selectedCategory = await category.findById(categoryId)
                                .populate("courses")
                                .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Get a different category
    const differentCategory = await category.findOne({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    // Get top-selling (or all published) courses
    const allCourses = await Course.find({
      status: "Published",
    })
      .populate("instructor")
      .populate("ratingAndReviews")
      .sort({ sold: -1 }); // if sold field exists

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        allCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching category page details",
      error: error.message,
    });
  }
}; 