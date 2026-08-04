import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  duration: number;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, trim: true },
  difficulty: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
  focus: { type: String, required: true, trim: true }
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
