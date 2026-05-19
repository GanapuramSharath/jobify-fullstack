import { Router } from "express";
const router = Router();
import upload from "../MiddleWare/multerMiddleware.js";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

import { validateUpdateUserInput } from "../MiddleWare/validationMiddleware.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../MiddleWare/authMiddleWare.js";

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
