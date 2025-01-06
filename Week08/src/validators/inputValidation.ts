import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation rules
export const registerValidation = [
    body('username')
        .trim()
        .escape()
        .isLength({ min: 3, max: 25 })
        .withMessage('Username must be between 3 and 25 characters'),
    
    body('email')
        .trim()
        .escape()
        .isEmail()
        .withMessage('Must be a valid email address'),
    
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
];

export const loginValidation = [
    body('email')
        .trim()
        .escape()
        .isEmail()
        .withMessage('Must be a valid email address'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Validation result checker
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return void res.status(400).json({ errors: errors.array() });
    }
    next();
};