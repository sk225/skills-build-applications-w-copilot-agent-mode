import { Router } from 'express';
import { Workout } from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ name: 1 });
    res.json({ count: workouts.length, data: workouts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create({
      name: req.body.name || 'Custom Workout',
      difficulty: req.body.difficulty || 'medium',
      duration: req.body.duration || 20,
      focus: req.body.focus || 'general'
    });

    res.status(201).json({ message: 'Workout suggestion created', data: workout });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create workout', error });
  }
});

export default router;
