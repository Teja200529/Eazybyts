import Project from '../models/projectModel.js';

// Create a new project (requires login)
export const createProject = async (req, res) => {
  try {
    const project = new Project({ ...req.body, createdBy: req.user._id });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project', details: err.message });
  }
};

// ✅ Get all public projects (no login required)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // all projects
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects', details: err.message });
  }
};

// ✅ Get logged-in user's own projects (requires login)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user projects', details: err.message });
  }
};

// Get single project by id (public access)
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project', details: err.message });
  }
};

// Update a project (requires login & ownership)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project', details: err.message });
  }
};

// Delete a project (requires login & ownership)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project', details: err.message });
  }
};
