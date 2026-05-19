import { z } from "zod";

const createOrUpdateCandidateProfileSchema = z.object({
    body: z.object({
        fullName: z.string({
            message: "Full name is required",
        }),
        email: z
            .string({
                message: "Email is required",
            })
            .email("Invalid email address"),
        phoneNumber: z.string({
            message: "Phone number is required",
        }),
        skills: z.array(z.string(), {
            message: "Skills are required",
        }),
        experience: z.string({
            message: "Experience is required",
        }),
        education: z.string({
            message: "Education is required",
        }),
        resume: z.string({
            message: "Resume is required",
        }),
        githubLink: z.string().url("Invalid GitHub URL").optional().nullable(),
        linkedInLink: z
            .string()
            .url("Invalid LinkedIn URL")
            .optional()
            .nullable(),
    }),
});

const createOrUpdateRecruiterProfileSchema = z.object({
    body: z.object({
        name: z.string({
            message: "Company name is required",
        }),
        website: z
            .string({
                message: "Company website is required",
            })
            .url("Invalid company website URL"),
        description: z.string({
            message: "Company description is required",
        }),
        location: z.string({
            message: "Company location is required",
        }),
        logo: z.string({
            message: "Company logo is required",
        }),
    }),
});

export const ProfileValidation = {
    createOrUpdateCandidateProfileSchema,
    createOrUpdateRecruiterProfileSchema,
};
