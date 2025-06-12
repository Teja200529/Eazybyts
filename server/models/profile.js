import mongoose from 'mongoose';

// Define individual skill as an object with name and level
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true }
}, { _id: false });

// Main profile schema
const profileSchema = new mongoose.Schema({
  about: { type: String, default: '' },
  skills: { type: [skillSchema], default: [] }
});

export default mongoose.model('Profile', profileSchema);
