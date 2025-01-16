import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
} from "../services/SubcategoryService";

// Create Subcategory
export const addSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

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
    const subcategories = await getAllSubcategories();
    res.status(200).json({
      success: true,
      message: "Subcategories retrieved successfully",
      data: subcategories,
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
