import { Request, Response, Router } from 'express';
import { compile } from 'morgan';
import { User, IUser, ITodo} from './models/User';
import populateUsers from '../data/todos';

const router: Router = Router();


router.post('/add', async (req: Request, res: Response) => {
    try {
        // Check if user already exists
        const existingUser: IUser | null = await User.findOne({ name: req.body.name });
        
        // If user exists, add todo to existing user
        if (existingUser) {
            existingUser.todos.push({todo: req.body.todos, checked: false});
            await existingUser.save();
            console.log("User updated!");
            return res.status(201).json({ message: "User updated successfully" });
        }

        // If user does not exist, create new user
        const user: IUser = new User({
            name: req.body.name,
            todos: [{ todo: req.body.todos, checked: false }]
        });

        // Save user
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
        // Find user by name
        const user: IUser | null = await User.findOne({ name: req.params.id });
        if (!user) { // If user not found, return 404
            return res.status(404).json({ message: "User not found" });
        }
        // If user found, return todos
        return res.json(user.todos.map(todo => ({todo: todo.todo, checked: todo.checked})));
    } catch (error: any) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.put('/update', async (req: Request, res: Response) => {
    const { name, todo } = req.body;

    // Find user by name
    const user: IUser | null = await User.findOne({ name });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Find todo by name
    const todoIndex = user.todos.findIndex(todoItem => todoItem.todo === todo);
    if (todoIndex === -1) { // If todo not found, return 404
        return res.status(404).json({ message: "Todo not found" });
    }

    // Update todo
    user.todos.splice(todoIndex, 1);
    await user.save();
    return res.json({ message: "Todo deleted successfully." });
});


router.get('/populate', async (req: Request, res: Response) => {
    // Populate users
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

router.put("/updateTodo", async (req: Request, res: Response) => {
    const { name, todo, checked } = req.body;

    // Find user by name
    const user: IUser | null = await User.findOne({ name });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Find todo by name
    const todoIndex = user.todos.findIndex(todoItem => todoItem.todo === todo);
    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    // Update todo to checked
    user.todos[todoIndex].checked = checked;
    await user.save();
    return res.json({ message: "Todo updated successfully" });
});

export default router;
