import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    required: true
  },
  githubLink: {
    type: String,
    trim: true
  },
  liveLink: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });  // Automatically handles createdAt & updatedAt

const Project = mongoose.model('Project', projectSchema);
export default Project;
