import { Request, Response, Router } from "express";
import { compile } from "morgan";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { validateToken } from "./middleware/auth";

const router: Router = Router();

// User interface
interface IUser {
  email: string;
  password: string;
}

// Users array
const users: IUser[] = [];

// Register user
router.post("/api/user/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      return void res.status(403).json({ message: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const user: IUser = {
      email: email,
      password: hashedPassword,
    };

    // Add user to users array
    users.push(user);

    return void res.status(200).json(user);
  } catch (error: any) {
    console.error("Error registering user:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

// Get all users
router.get("/api/user/list", async (req: Request, res: Response) => {
  try {
    return void res.status(200).json(users);
  } catch (error: any) {
    console.error("Error getting users:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

// Login user
router.post("/api/user/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return void res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = users.find((user) => user.email === email);
    if (!user) {
      return void res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return void res.status(401).json({ message: "Invalid password" });
    }

    // Check if Secret is defined
    if (!process.env.SECRET) {
      throw new Error("JWT secret is not defined");
    }

    // Create JWT token
    const jwtPayload: JwtPayload = { email: email };
    const token = jwt.sign(jwtPayload, process.env.SECRET as string, {
      expiresIn: "2m",
    });

    return void res.status(200).json({ success: true, token: token });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

// Middleware to validate token
router.get(
  "/api/private",
  validateToken,
  async (req: Request, res: Response) => {
    try {
      return void res
        .status(200)
        .json({ message: "This is protected secure route!" });
    } catch (error: any) {
      return void res.status(500).json({ message: "Internal server error" });
    }
  },
);

export default router;
