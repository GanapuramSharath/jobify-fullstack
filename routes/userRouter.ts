import { Router } from "express";

import upload from "../middleware/multerMiddleware";

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController";

import { validateUpdateUserInput } from "../middleware/validationMiddleware";

import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.get("/current-user", authenticateUser, getCurrentUser);

router.get("/admin/app-stats", authenticateUser, getApplicationStats);

router.patch(
  "/update-user",
  authenticateUser,
  upload.single("avatar"),
  ...validateUpdateUserInput,
  updateUser,
);

export default router;
