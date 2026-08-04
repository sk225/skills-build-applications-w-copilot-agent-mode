"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const users = await user_1.User.find().sort({ username: 1 });
        res.json({ count: users.length, data: users });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await user_1.User.create({
            username: req.body.username || 'anonymous',
            email: req.body.email || 'unknown@example.com'
        });
        res.status(201).json({ message: 'User created', data: user });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
});
exports.default = router;
