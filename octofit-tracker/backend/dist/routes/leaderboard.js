"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = require("../models/leaderboard");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await leaderboard_1.LeaderboardEntry.find().sort({ rank: 1 });
        res.json({ count: leaderboard.length, data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
exports.default = router;
