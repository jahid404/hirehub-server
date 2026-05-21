import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ApplicationService } from "./application.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import ROLES from "../../constants/roles";

const applyJob = catchAsync(async (req: Request, res: Response) => {
    let userEmail: string | undefined;

    const token = req.headers.authorization;
    if (token) {
        try {
            const bearerToken = token.startsWith("Bearer ")
                ? token.split(" ")[1]
                : token;
            const decoded = jwt.verify(
                bearerToken,
                config.jwt.access_secret,
            ) as JwtPayload;

            if (decoded?.role && decoded.role !== ROLES.CANDIDATE) {
                throw new AppError(
                    httpStatus.FORBIDDEN,
                    "Only candidates are allowed to apply for jobs",
                );
            }

            userEmail = decoded?.email;
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            // Ignore token verification errors for guest candidate apply
        }
    }

    const result = await ApplicationService.applyJobInDB(
        req.body,
        req.file,
        userEmail,
    );

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Job application submitted successfully!",
        data: result,
    });
});

const getApplications = catchAsync(async (req: Request, res: Response) => {
    const { id: userId, role } = req.user!;

    const result = await ApplicationService.getApplicationsFromDB(
        userId,
        role,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Applications retrieved successfully!",
        data: result,
    });
});

const updateApplicationStatus = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const { status } = req.body;
        const { id: userId, role } = req.user!;

        const result = await ApplicationService.updateApplicationStatusInDB(
            id,
            status,
            userId,
            role,
        );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Application status updated successfully!",
            data: result,
        });
    },
);

export const ApplicationController = {
    applyJob,
    getApplications,
    updateApplicationStatus,
};
