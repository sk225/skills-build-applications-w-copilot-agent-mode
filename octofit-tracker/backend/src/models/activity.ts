import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  duration: number;
  user: string;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
  user: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
  notes: { type: String, trim: true }
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
