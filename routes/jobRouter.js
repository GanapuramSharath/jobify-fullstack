import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";

import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

router.get("/stats", authenticateUser, showStats);

router
  .route("/")
  .get(authenticateUser, getAllJobs)
  .post(
    authenticateUser,
    authorizePermissions("admin"),
    validateJobInput,
    createJob,
  );

router
  .route("/:id")
  .get(authenticateUser, validateIdParam, getJob)
  .patch(authenticateUser, validateIdParam, validateJobInput, updateJob)
  .delete(authenticateUser, validateIdParam, deleteJob);

export default router;
