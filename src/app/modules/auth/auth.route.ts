import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post(
    "/signin",
    validateRequest(AuthValidation.loginValidationSchema),
    AuthController.loginUser,
);

// Public route to register a new user
router.post(
    "/signup",
    validateRequest(AuthValidation.registerValidationSchema),
    AuthController.registerUser,
);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
