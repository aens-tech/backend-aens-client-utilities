import { Router } from 'express';
import authController from '../controllers/auth.controller';
import jwtMiddleware from '../middlewares/jwt.middleware';
import { body, check, param, query } from 'express-validator';

import ExpressValidatorMiddleware from '@/middlewares/expressValidator.middleware';
import ContactMiddleware from '@/middlewares/contact.middleware';
import ContactController from '@/controllers/contact.controller';
import UtilityMiddleware from '@/middlewares/utility.middleware';
import { createArrayOfExpressValidatorsForBodyNotEmpty } from '@/utils/utils';
import AuthMiddleware from '@/middlewares/auth.middleware';
import UtilityController from '@/controllers/utility.controller';

const utilityRouter = Router();

// userEmail,
// userName,
// userBirthday,
// userPhone,
// interests,

// Ruta para iniciar sesión

utilityRouter.post('/',
    [
        ...createArrayOfExpressValidatorsForBodyNotEmpty([
        'masterKey',
        'name',
        'slug',
        'type'
        ]),
        body('interests').isArray().withMessage('interests is required.'),
        body('date').isString().isDate().withMessage('interests is required as a date.')
    ],
    ExpressValidatorMiddleware.responseWithGenericResponse,
    AuthMiddleware.masterKeyRequired,
    UtilityController.createUtility
)

utilityRouter.get('/',
    [
        query('slug').notEmpty().withMessage('slug is required.')
    ],
    ExpressValidatorMiddleware.responseWithErrors,
    UtilityController.getUtily
)

utilityRouter.post('/action', 
    [
        ...createArrayOfExpressValidatorsForBodyNotEmpty([
            'userEmail',
            'action',
            'utilityType',
            'slug',
            'action'
        ]),
    ],
    ExpressValidatorMiddleware.responseWithErrors,
    UtilityMiddleware.checkUtilityType,
    UtilityMiddleware.checkActionType,
    UtilityMiddleware.checkInterests,
    ContactMiddleware.validateAction,
    ContactMiddleware.findAndUpdate,
    ContactController.executeContactAction
);

export default utilityRouter;
