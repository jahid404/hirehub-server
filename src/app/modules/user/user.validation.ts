import { z } from "zod";

const updateUserValidationSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address").optional(),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .optional(),
    }),
});

export const UserValidation = {
    updateUserValidationSchema,
};
