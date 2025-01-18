import {
  validateBudgetPayload,
  validateEditPayload,
} from "../utils/validators/budgetValidator";
import {
  createBudget,
  getBudgetByUserId,
  updateBudget,
} from "../services/BudgetService";

// Get a user's budget
export const getBudgetController = async (req, res) => {
  try {
    const userId = req.user.id;
    const budget = await getBudgetByUserId(userId);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found for this user",
        data: []
      });
    }

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create a budget
export const createBudgetController = async (req, res) => {
  try {
    const userId = req.user.id;
    const existingBudget = await getBudgetByUserId(userId);

    if (existingBudget) {
      return res.status(400).json({
        success: false,
        message: "A budget already exists for this user",
      });
    }

    const validatedPayload = validateBudgetPayload(req.body);
    const newBudget = await createBudget({ ...validatedPayload, userId });

    res.status(201).json({
      success: true,
      message: "Budget created successfully",
      data: newBudget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Edit a budget
export const editBudgetController = async (req, res) => {
  try {
    const userId = req.user.id;
    const budget = await getBudgetByUserId(userId);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found for this user",
      });
    }

    const validatedPayload = validateEditPayload(req.body);
    const updatedBudget = await updateBudget(userId, validatedPayload);

    res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      data: updatedBudget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
