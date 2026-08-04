import { Router } from 'express';
import { LeaderboardEntry } from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
    res.json({ count: leaderboard.length, data: leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default router;
