import { body, validationResult } from 'express-validator';
import { Router } from "express";
import SUController from "@/controllers/su.controller"
import expressValidatorMiddleware from '@/middlewares/expressValidator.middleware';

const elevateRoutes = Router();

elevateRoutes.post(
    "/su",
    [
        body("masterKey").notEmpty().withMessage("Field is required."),
        body('userId').notEmpty().withMessage("User ID is required.")
    ],
    expressValidatorMiddleware.responseWithGenericResponse,
    SUController.elevateUserToSU
)

elevateRoutes.post(
    "/admin",
    [
        body("masterKey").notEmpty().withMessage("Field is required."),
        body('userId').notEmpty().withMessage("User ID is required.")
    ],
    expressValidatorMiddleware.responseWithGenericResponse,
    SUController.elevateUserToAdmin
)

export default elevateRoutes