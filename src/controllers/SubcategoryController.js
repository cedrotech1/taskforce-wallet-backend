import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
} from "../services/SubcategoryService";

import {
  getCategoriesByUserId,
  getCategoryByIdAndUserId,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
} from "../services/CategoryService";

// Create Subcategory
export const addSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const userId = req.user.id;
    const category = await getCategoryByIdAndUserId(categoryId, userId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: [],
      });
    }
    // Validate input
    if (!name || !categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Name and categoryId are required." });
    }

    const subcategory = await createSubcategory({ name, categoryId });
    res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Subcategories
export const Subcategories = async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Retrieve all subcategories
    const subcategories = await getAllSubcategories();

    // Filter subcategories by the logged-in user's ID
    const filteredSubcategories = subcategories.filter(
      (subcategory) => subcategory.category?.user?.id === userId
    );

    res.status(200).json({
      success: true,
      message: "Subcategories retrieved successfully",
      data: filteredSubcategories,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Subcategory by ID
export const SubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await getSubcategoryById(id);

    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found." });
    }

    res.status(200).json({
      success: true,
      message: "Subcategory retrieved successfully",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Subcategory
export const editSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required." });
    }

    const [rows, [updatedSubcategory]] = await updateSubcategory(id, { name });

    if (!rows) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found." });
    }

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: updatedSubcategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Subcategory
export const removeSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const rows = await deleteSubcategory(id);

    if (!rows) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found." });
    }

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
