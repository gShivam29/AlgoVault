import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  email_verified: { type: Boolean, required: true },
  picture: { type: String, required: true },
  subject: {type: String, required: true},
  issuer: {type: String, required:true},
}, { timestamps: true });

export default mongoose.model('User', userSchema);
