import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  techStack: [String],
  githubLink: String,
  liveLink: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
