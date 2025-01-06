import { Request, Response, Router } from "express";
import { compile } from "morgan";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "../models/User";
import { Topic, ITopic } from "../models/Topic";
import { registerValidation, loginValidation, validate } from '../validators/inputValidation';
import { validationResult } from "express-validator";
import { validateToken, validateAdmin } from "../middleware/validateToken";

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

// Get all topics
router.get("/api/topics", async (req: Request, res: Response) => {
    try {
        // Find all topics
        const topics = await Topic.find();

        // Send a response that contains all topics
        return void res.json(topics);
    } catch (error: any) {
        return void res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Post a topic
router.post("/api/topic", validateToken, async (req: Request, res: Response) => {
    try {
        // Get the title and content from the request body
        const {title, content} = req.body;
        
        // Create a new topic
        const topic: ITopic = new Topic({
            title,
            content,
            username: (req as any).token.username // Get the username from the token
        });

        // Save the topic to the database
        await topic.save();

        // Send a response that contains the topic
        return void res.json(topic);
    } catch (error: any) {
        return void res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Delete a topic
router.delete("/api/topic/:id", validateAdmin, async (req: Request, res: Response) => {
    // Get the topic ID from the request parameters
    const id = req.params.id;

    // Find the topic by ID and delete it
    await Topic.findByIdAndDelete(id);

    // Send a response
    return void res.json({ message: "Topic deleted successfully." });
});


export default router;
