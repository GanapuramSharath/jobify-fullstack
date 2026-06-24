import { Router } from "express";

import { register, login, logout } from "../controllers/authController";
import {
  validateRegister,
  validateLoginInput,
} from "../middleware/validationMiddleware";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
