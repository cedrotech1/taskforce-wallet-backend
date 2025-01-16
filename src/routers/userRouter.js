import express from 'express';
import {
  create_account,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  changePassword,
  checkEmail,
  checkCode,
  ResetPassword
} from '../controllers/userController';
import { protect } from '../middlewares/protect';
const router = express.Router();

router.post('/signup', create_account);
router.get('/', protect, getAllUsers);
router.post('/check', checkEmail);
router.post('/code/:email', checkCode);
router.get('/:id', protect, getOneUser);
router.put('/update/:id', protect, updateOneUser);
router.delete('/delete/:id', protect, deleteOneUser);
router.put('/changePassword', protect, changePassword);
router.put('/resetPassword/:email', ResetPassword);



export default router;
