import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JobService } from "./job.service";
import AppError from "../../errors/AppError";

const createJob = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authenticated!",
        );
    }

    const { id: userId } = req.user;
    const result = await JobService.createJobIntoDB(userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Job post created successfully!",
        data: result,
    });
});

const getAllJobs = catchAsync(async (req: Request, res: Response) => {
    const result = await JobService.getAllJobsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Jobs fetched successfully!",
        data: result,
    });
});

const getSingleJob = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await JobService.getSingleJobFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Job fetched successfully!",
        data: result,
    });
});

const updateJob = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authenticated!",
        );
    }

    const { id: userId } = req.user;
    const { id } = req.params;
    const result = await JobService.updateJobInDB(
        id as string,
        userId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Job post updated successfully!",
        data: result,
    });
});

const deleteJob = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authenticated!",
        );
    }

    const { id: userId } = req.user;
    const { id } = req.params;
    const result = await JobService.deleteJobFromDB(id as string, userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Job post deleted successfully!",
        data: result,
    });
});

export const JobController = {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
};
