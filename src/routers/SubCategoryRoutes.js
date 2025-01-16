import express from "express";
import {
  addSubcategory,
  Subcategories,
  SubcategoryById,
  editSubcategory,
  removeSubcategory,
} from "../controllers/SubcategoryController";
import { protect } from "../middlewares/protect";


const router = express.Router();


router.post("/add", protect,addSubcategory); // Add Subcategory
router.get("/", protect,Subcategories); // Get All Subcategories
router.get("/one/:id",protect, SubcategoryById);// Get Subcategory by ID
router.put("/update/:id",protect, editSubcategory); // Update Subcategory
router.delete("/delete/:id",protect, removeSubcategory); // Delete Subcategory

export default router;
