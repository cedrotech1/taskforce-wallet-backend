import express from "express";
import {
  addAccountController,
  Accounts,
  deleteOneAccountController,
  getOneAccountController,
  updateAccountController,
} from "../controllers/AccountsController";
import { protect } from "../middlewares/protect";
import { optionalProtect } from "../middlewares/optionalprotect";

const router = express.Router();

router.post("/add", protect, addAccountController);
router.get("/", protect, Accounts);
router.get("/one/:id", protect, getOneAccountController);
router.put("/update/:id", protect, updateAccountController);
router.delete("/delete/:id", protect, deleteOneAccountController);

export default router;
