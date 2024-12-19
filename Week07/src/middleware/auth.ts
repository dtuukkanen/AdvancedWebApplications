import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Custom request interface
interface CustomRequest extends Request {
  user?: JwtPayload;
}

// Middleware to validate token
export const validateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  // Get token from header
  const token: string | undefined = req.header("authorization")?.split(" ")[1];

  // If no token is found, return response
  if (!token) {
    return void res.status(401).json({ message: "Access denied" });
  }

  // Verify token
  try {
    const verified = jwt.verify(
      token,
      process.env.SECRET as string,
    ) as JwtPayload;
    req.user = verified;
    next();
  } catch (error: any) {
    return void res.status(401).json({
      message: "Invalid token",
    });
  }
};
