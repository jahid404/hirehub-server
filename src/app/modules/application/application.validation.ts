import { z } from "zod";

const applyJobValidationSchema = z.object({
    body: z.object({
        jobId: z.string({ message: "Job ID is required" }),
        fullName: z.string({ message: "Full name is required" }),
        email: z
            .string({ message: "Email is required" })
            .email({ message: "Invalid email address" }),
        phone: z.string({ message: "Phone number is required" }),
        coverLetter: z.string().optional(),
        linkedInUrl: z.string().optional(),
    }),
});

const updateApplicationStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(
            [
                "pending",
                "under_review",
                "shortlisted",
                "interview_scheduled",
                "offered",
                "accepted",
                "rejected",
            ],
            {
                message:
                    "Status must be one of pending, under review, shortlisted, interview scheduled, offered, accepted, rejected",
            },
        ),
    }),
});

export const ApplicationValidation = {
    applyJobValidationSchema,
    updateApplicationStatusValidationSchema,
};
