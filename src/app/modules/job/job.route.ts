import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { JobValidation } from "./job.validation";
import { JobController } from "./job.controller";
import ROLES from "../../constants/roles";

const router = express.Router();

router.get("/", JobController.getAllJobs);
router.get("/:id", JobController.getSingleJob);

// Create a job (Recruiter only)
router.post(
    "/create-job",
    auth(ROLES.RECRUITER),
    validateRequest(JobValidation.createJobValidationSchema),
    JobController.createJob,
);

// Update a job post (Recruiter only)
router.patch(
    "/:id",
    auth(ROLES.RECRUITER),
    validateRequest(JobValidation.updateJobValidationSchema),
    JobController.updateJob,
);

// Delete a job post (Recruiter only)
router.delete("/:id", auth(ROLES.RECRUITER), JobController.deleteJob);

export const JobRoutes = router;
