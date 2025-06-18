import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  difficulty: { type: String, required: true },
  code: { type: String, required: true },
  notes: { type: String, required: true },
  category: { type: [String], required: true },
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
