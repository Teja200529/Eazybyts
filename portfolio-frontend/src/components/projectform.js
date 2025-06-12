// src/components/ProjectForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/projectForm.css';

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        const token = localStorage.getItem('token');
        try {
          const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const p = res.data;
          setTitle(p.title);
          setDescription(p.description);
          setTechnologies(p.technologies.join(', '));
          setImageUrl(p.imageUrl);
          setGithubLink(p.githubLink || '');
          setLiveLink(p.liveLink || '');
          setFeatured(p.featured);
        } catch (err) {
          setError(err.response?.data?.msg || err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const projectData = {
      title,
      description,
      technologies: technologies.split(',').map(t => t.trim()),
      imageUrl,
      githubLink,
      liveLink,
      featured,
    };

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/projects/${id}`, projectData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Project updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/projects', projectData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Project created successfully');
      }
      navigate('/projects');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.msg || err.message));
    }
  };

  if (loading) return <div>Loading project data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="project-form-container">
      <h2 className="form-heading">{isEdit ? 'Edit Project' : 'Add New Project'}</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            rows={4}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Technologies (comma separated)</label>
          <input
            type="text"
            value={technologies}
            onChange={e => setTechnologies(e.target.value)}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>GitHub Link</label>
          <input
            type="url"
            value={githubLink}
            onChange={e => setGithubLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Live Link</label>
          <input
            type="url"
            value={liveLink}
            onChange={e => setLiveLink(e.target.value)}
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
            />
            Featured Project
          </label>
        </div>

        <button type="submit" className="submit-btn">
          {isEdit ? 'Update Project' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}
