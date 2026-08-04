"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const workouts = await workout_1.Workout.find().sort({ name: 1 });
        res.json({ count: workouts.length, data: workouts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const workout = await workout_1.Workout.create({
            name: req.body.name || 'Custom Workout',
            difficulty: req.body.difficulty || 'medium',
            duration: req.body.duration || 20,
            focus: req.body.focus || 'general'
        });
        res.status(201).json({ message: 'Workout suggestion created', data: workout });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create workout', error });
    }
});
exports.default = router;
