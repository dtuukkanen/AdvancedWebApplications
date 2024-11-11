"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let users = [];
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
    const numbers = req.body.numbers;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    res.json({ sum });
});
router.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.json({ message: 'User successfully added' });
});
exports.default = router;
