// backend/models/AboutMe.js
import mongoose from 'mongoose';

const AboutMeSchema = new mongoose.Schema({
  about: { type: String, required: true }
});

const AboutMe = mongoose.model('AboutMe', AboutMeSchema);
export default AboutMe;
