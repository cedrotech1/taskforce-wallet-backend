import express from 'express';

import docrouter from '../documentation/index.doc';
import userRouter from './userRouter';
import authRouter from './authRouter';
import AccountsRouter from './AccountsRouter';
import BudgetRouter from "./BudgetRouter";
import CategoryRouter from "./categoryRoute";
import SubCategoryRouter from "./SubCategoryRoutes";
import TransactionRouter from "./TransactionRoute";
const router = express.Router();

router.use('/docs', docrouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/Account', AccountsRouter);
router.use("/budgets", BudgetRouter);
router.use("/category", CategoryRouter);
router.use("/subcategory", SubCategoryRouter);
router.use("/transaction", TransactionRouter);


export default router;
