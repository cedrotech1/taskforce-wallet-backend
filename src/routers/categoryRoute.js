import express from "express";
import {
  getCategoriesController,
  getCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/CategoryController";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.get("/", protect, getCategoriesController); // Get all categories for logged-in user
router.get("/one/:id", protect, getCategoryController); // Get a single category
router.post("/add", protect, createCategoryController); // Create a category
router.put("/update/:id", protect, updateCategoryController); // Update a category
router.delete("/delete/:id", protect, deleteCategoryController); // Delete a category

export default router;
