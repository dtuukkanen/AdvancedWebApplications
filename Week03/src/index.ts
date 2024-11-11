import { Request, Response, Router } from 'express';

const router: Router = Router();

type TUser = {
    name: string;
    email: string;
}
  
let users: TUser[] = [];

router.get('/hello', (req, res) => {
    res.json({ msg: 'Hello world!' });
});
  
router.get('/echo/:id', (req, res) => {
    res.json({ id: req.params.id });
});

router.get('/users', (req, res) => {
    res.status(201).json({ users: users });
});
  
router.post('/sum', (req, res) => {
    const numbers: number[] = req.body.numbers;
    const sum: number = numbers.reduce((acc, curr) => acc + curr, 0);
    res.json({ sum });
});
  
router.post('/users', (req, res) => {
    const user: TUser = req.body;
    users.push(user);
    res.json({ message: 'User successfully added' });
});

export default router;