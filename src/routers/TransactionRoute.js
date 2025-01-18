import express from "express";
import {
  addTransaction,
  Transactions,
  TransactionById,
  removeTransaction,
  generateUserReport,
  getTransactionSummary,
  TransactionStatistics
} from "../controllers/TransactionController";
import { protect } from "../middlewares/protect";


const router = express.Router();

router.post("/add", protect, addTransaction);
router.get("/", protect, Transactions);
router.get("/one/:id", protect, TransactionById);
// router.put("/update/:id", protect, editTransaction);
router.delete("/delete/:id", protect, removeTransaction);
router.get("/user-report", protect, generateUserReport);
router.get("/transaction-summary", protect, getTransactionSummary);
router.get("/transaction-statistics", protect, TransactionStatistics);

export default router;
