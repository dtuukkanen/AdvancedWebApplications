import { Request, Response, Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { compile } from 'morgan';

const router: Router = Router();

type TUser = {
    name: string;
    todos: string[];
}

let users: TUser[] = [];

const loadUsers = async () => {
    try {
        const data = await fs.readFile("data.json", "utf-8");
        users = JSON.parse(data);
    } catch (error) {
        console.error('Error loading users:', error);
    }
};

loadUsers();

const saveUsers = async () => {
    try {
        await fs.writeFile("data.json", JSON.stringify(users));
    } catch (error) {
        console.error('Error saving users:', error);
    }
};


router.post('/add', (req: Request, res: Response) => {
    let newUser: TUser = {
        name: req.body.name,
        todos: [req.body.todos]
    }
    console.log(newUser);

    // Check if user already exists
    let existingUser = users.find(user => user.name === newUser.name);
    
    if (existingUser) {
        // Append the new task to the existing user
        console.log(existingUser);
        existingUser.todos.push(...newUser.todos);
    } else {
        // Add the new user
        users.push(newUser);
    }

    try {
        saveUsers();
        res.json({ message: `Todo added successfully for user ${newUser.name}` });
    } catch (err) {
        console.error(err);
    }
});

router.get('/todos/:id', (req: Request, res: Response) => {
    const user = users.find(user => user.name === req.params.id);
    if (user) {
        res.json(user.todos);
    } else {
        res.json({ message: `User not found` });
    }
});

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

export default router;
