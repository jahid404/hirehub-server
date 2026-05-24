import express from "express";
import auth from "../../middlewares/auth";
import { DashboardController } from "./dashboard.controller";
import ROLES from "../../constants/roles";

const router = express.Router();

router.get(
    "/",
    auth(ROLES.ADMIN, ROLES.RECRUITER, ROLES.CANDIDATE),
    DashboardController.getStats,
);

export const DashboardRoutes = router;
