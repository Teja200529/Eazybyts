import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/projectList.css';

export default function ProjectList({ isEditable = true }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(prev => prev.filter(project => project._id !== projectId));
    } catch (err) {
      alert('Error deleting project: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="project-list-container">
      <h2>Projects</h2>

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : projects.length === 0 ? (
        <p className="no-projects-msg">No projects found.</p>
      ) : (
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project._id} className="project-list-item">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
              )}

              {project.techStack?.length > 0 && (
                <p>
                  <strong>Tech Stack:</strong> {project.techStack.join(', ')}
                </p>
              )}

              {project.githubLink && (
                <p>
                  <strong>GitHub:</strong>{' '}
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    {project.githubLink}
                  </a>
                </p>
              )}

              {project.liveLink && (
                <p>
                  <strong>Live Demo:</strong>{' '}
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    {project.liveLink}
                  </a>
                </p>
              )}

              {/* ✅ Show only when user is logged in AND edit mode is enabled */}
              {isLoggedIn && isEditable && (
                <div className="edit-btn-container">
                  <Link to={`/edit-project/${project._id}`} className="edit-btn">✏️ Edit</Link>
                  <button onClick={() => handleDelete(project._id)} className="delete-btn">🗑️ Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
