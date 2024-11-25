import { Request, Response, Router } from 'express';
import { compile } from 'morgan';
import { User, IUser, ITodo} from './models/User';
import populateUsers from '../data/todos';

const router: Router = Router();


router.post('/add', async (req: Request, res: Response) => {
    try {
        // Check if user already exists
        const existingUser: IUser | null = await User.findOne({ name: req.body.name });
        
        if (existingUser) {
            existingUser.todos.push({todo: req.body.todos});
            await existingUser.save();
            console.log("User updated!");
            return res.status(201).json({ message: "User updated successfully" });
        }

        const user: IUser = new User({
            name: req.body.name,
            todos: [{ todo: req.body.todos }]
        });

        await user.save();
        console.log("User saved!");
        return res.status(201).json({ message: "User saved successfully" });

    } catch (error: any) {
        console.error("Error saving user:", error);
        return res.status(201).json({ message: "Internal server error" });
    }
});


router.get('/todos/:id', async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findOne({ name: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user.todos.map(todo => todo.todo));
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


router.put('/update', async (req: Request, res: Response) => {
    const { name, todo } = req.body;

    const user: IUser | null = await User.findOne({ name });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const todoIndex = user.todos.findIndex(todoItem => todoItem.todo === todo);
    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    user.todos.splice(todoIndex, 1);
    await user.save();
    return res.json({ message: "Todo deleted successfully." });
});


router.get('/populate', async (req: Request, res: Response) => {
    for (let i = 0; i < populateUsers.length; i++) {
        const user: IUser = new User({
            name: populateUsers[i].name,
            todos: populateUsers[i].todos.map(todoText => ({ todo: todoText}))
        });
        await user.save();
    }
    console.log("Users populated!");
    return res.json({ message: "Users populated successfully" });
});

export default router;
