import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Protected routes
router.get("/", auth(), UserController.getAllUsers);
router.get("/:id", auth(), UserController.getSingleUser);

export const UserRoutes = router;
