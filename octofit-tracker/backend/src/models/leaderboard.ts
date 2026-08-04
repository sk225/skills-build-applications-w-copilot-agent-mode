import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  username: string;
  score: number;
  team: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true, min: 1 },
  username: { type: String, required: true, trim: true },
  score: { type: Number, required: true, min: 0 },
  team: { type: String, required: true, trim: true }
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
