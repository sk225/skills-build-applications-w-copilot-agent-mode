import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  focus: string;
  members: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, trim: true },
  focus: { type: String, required: true, trim: true },
  members: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
