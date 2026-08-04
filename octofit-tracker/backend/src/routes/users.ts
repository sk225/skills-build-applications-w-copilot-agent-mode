import { Router } from 'express';
import { User } from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.json({ count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username || 'anonymous',
      email: req.body.email || 'unknown@example.com'
    });

    res.status(201).json({ message: 'User created', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
});

export default router;
