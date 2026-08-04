import { Router } from 'express';
import { Team } from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json({ count: teams.length, data: teams });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const team = await Team.create({
      name: req.body.name || 'New Team',
      members: req.body.members || 1,
      focus: req.body.focus || 'general'
    });

    res.status(201).json({ message: 'Team created', data: team });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create team', error });
  }
});

export default router;
