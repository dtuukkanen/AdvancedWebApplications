import { Request, Response, Router } from 'express';
import { compile } from 'morgan';
import { User, IUser } from './models/User';

const router: Router = Router();


router.post('/api/add', async (req: Request, res: Response) => {
    try {
        // Check if user already exists
        const existingUser: IUser | null = await User.findOne({ name: req.body.name });
        
        if (existingUser) {
            return res.status(403).json({ message: "User already exists" });
        }

        const user: IUser = new User({
            name: req.body.name,
            todos: [req.body.todo]
        });
        
        await user.save();
        console.log("User saved!");
        return res.status(201).json({ message: "User saved successfully" });

    } catch (error: any) {
        console.error("Error saving user:", error);
        return res.status(201).json({ message: "Internal server error" });
    }
});


router.get('/api/todos/:id', async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user.todos);
    } catch (error: any) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

/*
router.delete('/delete', async (req: Request, res: Response) => {
    const userName = req.body.name;
    const user = users.find(user => user.name === userName);
    if (user) {
        users = users.filter(user => user.name !== userName);
        try {
            await saveUsers();
            res.json({ message: `User deleted successfully` });
        } catch (err) {
            console.error(err);
        }
    } else {
        res.json({ message: `User not found` });
    }
});
*/

/*
router.put('/update', async (req: Request, res: Response) => {
    const { name, todo } = req.body;
    const user = users.find(user => user.name === name);

    if (user) {
        const todoIndex = user.todos.indexOf(todo);
        if (todoIndex > -1) {
            user.todos.splice(todoIndex, 1);
            try {
                await saveUsers();
                res.json({ message: `Todo deleted successfully.` });
            } catch (err) {
                console.error(err);
            }
        } else {
            res.json({ message: `Todo not found` });
        }
    } else {
        res.json({ message: `User not found` });
    }
});
*/

export default router;
