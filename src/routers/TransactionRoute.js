import express from "express";
import {
  addTransaction,
  Transactions,
  TransactionById,
  editTransaction,
  removeTransaction,
  generateUserReport,
   getTransactionSummary
} from "../controllers/TransactionController";
import { protect } from "../middlewares/protect";


const router = express.Router();

router.post("/add", protect, addTransaction);
router.get("/", protect, Transactions);
router.get("/one/:id", protect, TransactionById);
router.put("/update/:id", protect, editTransaction);
router.delete("/delete/:id", protect, removeTransaction);
router.get("/user-report", protect, generateUserReport);
router.get("/transaction-summary", protect, getTransactionSummary);

export default router;
