import Project from '../models/projectModel.js';

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name');  // adjust 'name' if needed
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single project
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create project
export const createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdBy: req.user.id
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }
    
    Object.assign(project, req.body);
    await project.save();
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }
    
    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
