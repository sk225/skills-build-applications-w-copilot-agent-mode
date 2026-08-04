"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("../config/database");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
async function waitForConnection() {
    if (mongoose_1.default.connection.readyState === 1) {
        return;
    }
    await new Promise((resolve, reject) => {
        mongoose_1.default.connection.once('open', () => resolve());
        mongoose_1.default.connection.once('error', reject);
    });
}
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await waitForConnection();
    await mongoose_1.default.connection.db?.dropDatabase();
    const users = await user_1.User.create([
        { username: 'morgan', email: 'morgan@example.com' },
        { username: 'jamie', email: 'jamie@example.com' },
        { username: 'alex', email: 'alex@example.com' }
    ]);
    const teams = await team_1.Team.create([
        { name: 'Trail Blazers', focus: 'endurance', members: 4 },
        { name: 'Velocity Squad', focus: 'strength', members: 3 }
    ]);
    await activity_1.Activity.create([
        { type: 'run', duration: 30, user: users[0].username, notes: 'Morning park run' },
        { type: 'strength', duration: 45, user: users[1].username, notes: 'Full-body circuit' },
        { type: 'yoga', duration: 20, user: users[2].username, notes: 'Recovery flow' }
    ]);
    await leaderboard_1.LeaderboardEntry.create([
        { rank: 1, username: users[0].username, score: 980, team: teams[0].name },
        { rank: 2, username: users[1].username, score: 915, team: teams[1].name },
        { rank: 3, username: users[2].username, score: 890, team: teams[0].name }
    ]);
    await workout_1.Workout.create([
        { name: 'Morning Mobility', difficulty: 'easy', duration: 20, focus: 'recovery' },
        { name: 'HIIT Circuit', difficulty: 'hard', duration: 35, focus: 'cardio' },
        { name: 'Power Strength', difficulty: 'medium', duration: 40, focus: 'strength' }
    ]);
    console.log('Database seeding complete');
}
seedDatabase()
    .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
})
    .finally(() => {
    mongoose_1.default.disconnect();
});
