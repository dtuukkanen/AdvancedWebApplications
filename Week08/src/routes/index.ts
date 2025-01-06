import { Request, Response, Router } from "express";
import { compile } from "morgan";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "../models/User";
import { registerValidation, loginValidation, validate } from '../validators/inputValidation';
import { validationResult } from "express-validator";

const router: Router = Router();

// Register
router.post("/api/user/register", async (req: Request, res: Response) => {
    const { email, password, username, isAdmin } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return void res.status(403).send({ message: "User already exists" });
    }

    // Validation
    await Promise.all(registerValidation.map(validation => validation.run(req)));
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return void res.status(400).json({ errors: validationErrors.array() });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user to the database
    const newUser: IUser = new User({
        email: email,
        password: hashedPassword,
        username: username,
        isAdmin: isAdmin
    });

    // Save the user to the database
    await newUser.save();
    
    // Send a response
    return void res.json(newUser);
});

// Login
router.post("/api/user/login", loginValidation, validate, async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
    
        // Check if the user exists
        const user = await User.findOne({ email: email })
        if (!user) {
            return void res.status(404).send({ message: "User not found" });
        }
    
        // Check if the password is correct
        if (bcrypt.compareSync(password, user.password as string)) {
            const jwtPayload: JwtPayload = {
                id: user._id,
                username: user.username,
                isAdmin: user.isAdmin
            };
    
            const token: string = jwt.sign(jwtPayload, process.env.SECRET as string, { expiresIn: "2m" });
    
            return void res.status(200).json({ token });
        }
        return void res.status(401).send({ message: "Invalid credentials" });
    } catch (error: any) {
        return void res.status(500).send({ message: "Internal server error", error: error.message });
    }
});

export default router;
