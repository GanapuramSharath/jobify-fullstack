import { Router } from "express";
const router = Router();
import upload from "../middleware/multerMiddleware.js";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

router.get("/current-user", authenticateUser, getCurrentUser);

router.get(
  "/admin/app-stats",
  authenticateUser,
  getApplicationStats,
);

router.patch(
  "/update-user",
  authenticateUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser,
);

export default router;
