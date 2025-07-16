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


// userId: {
//     type: mongoose.Schema.Types.ObjectId,  // Reference to the User collection
//     ref: 'User',  // Refers to the User model
//     required: true,  // Every question must be associated with a user
//   }