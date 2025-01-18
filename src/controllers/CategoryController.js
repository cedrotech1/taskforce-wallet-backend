import {
  getCategoriesByUserId,
  getCategoryByIdAndUserId,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
} from "../services/CategoryService";

// Get all categories for the logged-in user
export const getCategoriesController = async (req, res) => {
  try {
    const userId = req.user.id;
    const categories = await getAllCategories(userId);

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        error: error.message,
        data: [],
      }
    );
  }
};

// Get a single category by ID
export const getCategoryController = async (req, res) => {
  try {
    const userId = req.user.id;
    const category = await getCategoryByIdAndUserId(req.params.id, userId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, data: [], });
  }
};

// Create a new category
export const createCategoryController = async (req, res) => {
  try {
    const userId = req.user.id; // Logged-in user's ID

    if (!req.body.name || typeof req.body.name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Category name is required and must be a string",
      });
    }


    const category = await createCategory({ ...req.body, userId });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a category
export const updateCategoryController = async (req, res) => {
  try {
    const userId = req.user.id;
    const category = await updateCategory(req.params.id, userId, req.body);

    if (!req.body.name || typeof req.body.name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Category name is required and must be a string",
      });
    }


    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a category
export const deleteCategoryController = async (req, res) => {
  try {
    const userId = req.user.id;
    const deleted = await deleteCategory(req.params.id, userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
