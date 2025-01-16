// optionalProtect.js
import { protect } from '../middlewares/protect';

export const optionalProtect = (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
};
