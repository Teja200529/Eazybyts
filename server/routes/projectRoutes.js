import express from 'express';
import Project from '../models/projectModel.js';
import {
  createProject,
  getProjects,
  getAllProjects,   // <- import this
  getProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔐 Protected: Get only the logged-in user's projects
router.get('/my-projects', protect, getProjects);

// 🌐 Public: Get all public projects (for homepage)
router.get('/', getAllProjects);  // Use controller function here

// 🔐 Protected create
router.post('/', protect, createProject);

// 🔓 Public: Get one project by ID
router.get('/:id', getProject);

// 🔐 Protected update & delete
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
