import { Router } from "express";
const router = Router();
import upload from "../middleWare/multerMiddleware.js";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

import { validateUpdateUserInput } from "../middleWare/validationMiddleware.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../middleWare/authMiddleware.js";

router.get("/current-user", authenticateUser, getCurrentUser);

router.get(
  "/admin/app-stats",
  authenticateUser,
  authorizePermissions("admin"),
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
