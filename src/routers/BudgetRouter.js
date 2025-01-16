import express from "express";
import {
  getBudgetController,
  createBudgetController,
  editBudgetController,
} from "../controllers/BudgetController";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.get("/", protect, getBudgetController);
router.post("/add", protect, createBudgetController);
router.put("/edit", protect, editBudgetController);

export default router;
