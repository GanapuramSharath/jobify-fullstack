import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";

const router = Router();
import {
  validateRegister,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
router.post("/register", validateRegister, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
