import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    techStack: '',
    githubLink: '',
    liveLink: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const project = res.data;
        setFormData({
          title: project.title,
          description: project.description,
          image: project.image || '',
          techStack: project.techStack ? project.techStack.join(', ') : '',
          githubLink: project.githubLink || '',
          liveLink: project.liveLink || ''
        });
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        techStack: formData.techStack.split(',').map(tech => tech.trim())
      };

      await axios.put(`http://localhost:5000/api/projects/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Project updated!');
      navigate('/dashboard'); // or wherever your project list is
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update project');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
        <input name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack (comma-separated)" />
        <input name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="GitHub Link" />
        <input name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="Live Link" />
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}
