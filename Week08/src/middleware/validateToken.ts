import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Interface for decoded token
interface CustomRequest extends Request {
    token: string | JwtPayload;
}

// Middleware to validate user token
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return void res.status(401).json({ message: "Token not found." });
        }

        const decoded = jwt.verify(token, process.env.SECRET as string);
        (req as CustomRequest).token = decoded;

        next();
    } catch (error) {
        return void res.status(401).json({ message: "Invalid token" });
    }
};

// Middleware to validate admin rights
export const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return void res.status(401).json({ message: "Token not found." });
        }

        const decoded = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
        
        if (!decoded.isAdmin) {
            return void res.status(403).json({ message: "Access denied." });
        }

        (req as CustomRequest).token = decoded;
        next();
    } catch (error) {
        return void res.status(403).json({ message: "Access denied." });
    }
};
