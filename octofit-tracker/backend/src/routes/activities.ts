import { Router } from 'express';
import { Activity } from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    res.json({ count: activities.length, data: activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const activity = await Activity.create({
      type: req.body.type || 'custom',
      duration: req.body.duration || 0,
      user: req.body.user || 'anonymous',
      notes: req.body.notes
    });

    res.status(201).json({ message: 'Activity logged', data: activity });
  } catch (error) {
    res.status(500).json({ message: 'Failed to log activity', error });
  }
});

export default router;
