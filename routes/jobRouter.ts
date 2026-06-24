import { Router } from "express";

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController";

import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware";

import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.get("/stats", authenticateUser, showStats);

router
  .route("/")
  .get(authenticateUser, getAllJobs)
  .post(authenticateUser, ...validateJobInput, createJob);

router
  .route("/:id")
  .get(authenticateUser, ...validateIdParam, getJob)
  .patch(authenticateUser, ...validateIdParam, ...validateJobInput, updateJob)
  .delete(authenticateUser, ...validateIdParam, deleteJob);

export default router;
