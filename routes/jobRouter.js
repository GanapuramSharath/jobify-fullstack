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
} from "../MiddleWare/validationMiddleware.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../MiddleWare/authMiddleWare.js";


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
