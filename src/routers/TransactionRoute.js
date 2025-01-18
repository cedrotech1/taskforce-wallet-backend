import express from "express";
import {
  addTransaction,
  Transactions,
  TransactionById,
  removeTransaction,
  generateTransactionUserReport,
  getTransactionSummary,
} from "../controllers/TransactionController";
import { protect } from "../middlewares/protect";


const router = express.Router();

router.post("/add", protect, addTransaction);
router.get("/", protect, Transactions);
router.get("/one/:id", protect, TransactionById);
// router.put("/update/:id", protect, editTransaction);
router.delete("/delete/:id", protect, removeTransaction);
router.get("/transaction-report", protect, generateTransactionUserReport);
router.get("/transaction-summary", protect, getTransactionSummary);


export default router;
