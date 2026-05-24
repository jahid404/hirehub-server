import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DashboardService } from "./dashboard.service";
import AppError from "../../errors/AppError";
import ROLES from "../../constants/roles";

const getStats = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authenticated!",
        );
    }

    const { id: userId, role } = req.user;
    let result: any;

    if (role === ROLES.ADMIN) {
        result = await DashboardService.getAdminStats();
    } else if (role === ROLES.RECRUITER) {
        result = await DashboardService.getRecruiterStats(userId);
    } else if (role === ROLES.CANDIDATE) {
        result = await DashboardService.getCandidateStats(userId);
    } else {
        throw new AppError(
            httpStatus.FORBIDDEN,
            "Forbidden dashboard access role!",
        );
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Dashboard statistics fetched successfully!",
        data: result,
    });
});

export const DashboardController = {
    getStats,
};
