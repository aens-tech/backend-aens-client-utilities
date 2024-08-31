import { Router } from 'express';

import expressValidatorMiddleware from '@/middlewares/expressValidator.middleware';
import { body } from 'express-validator';

const companyRoutes = Router();

companyRoutes.post(
    "/create",
    [
        body("name"                 ).notEmpty()        .withMessage("Name is required."),
        body("slug"                 ).notEmpty()        .withMessage("Slug is required"),
        body("ownerId"              ).notEmpty()        .withMessage("Owner ID is required."),
        body("week_days_available"  ).not().isArray()   .withMessage("Week Days Available most be an array."),
        body("custom_disabled_dates").not().isArray()   .withMessage("Custom Disabled Dates most be an array."),
        body("zone_images"          ).not().isArray()   .withMessage("Zone Images most be an array."),
        body("zones"                ).not().isArray()   .withMessage("Zones most be an array."),
        body("hours"                ).not().isArray()   .withMessage("Hours most be an array.")
    ],
    expressValidatorMiddleware.responseWithErrors,

);

export default companyRoutes