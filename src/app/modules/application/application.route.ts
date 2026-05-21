import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ApplicationValidation } from "./application.validation";
import { ApplicationController } from "./application.controller";
import ROLES from "../../constants/roles";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const targetDir = "public/uploads/applications";
        const fullTargetDir = path.join(process.cwd(), targetDir);
        if (!fs.existsSync(fullTargetDir)) {
            fs.mkdirSync(fullTargetDir, { recursive: true });
        }
        cb(null, targetDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname),
        );
    },
});

const uploadApplications = multer({ storage: storage });

const router = express.Router();

// Apply for a job
router.post(
    "/apply",
    uploadApplications.single("file"),
    validateRequest(ApplicationValidation.applyJobValidationSchema),
    ApplicationController.applyJob,
);

// Get applications
router.get(
    "/",
    auth(ROLES.CANDIDATE, ROLES.RECRUITER, ROLES.ADMIN),
    ApplicationController.getApplications,
);

// Update application status
router.patch(
    "/:id/status",
    auth(ROLES.RECRUITER, ROLES.ADMIN),
    validateRequest(
        ApplicationValidation.updateApplicationStatusValidationSchema,
    ),
    ApplicationController.updateApplicationStatus,
);

export const ApplicationRoutes = router;
