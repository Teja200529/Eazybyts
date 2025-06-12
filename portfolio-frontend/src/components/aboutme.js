// src/components/aboutme.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/aboutme.css';

export default function AboutMe({ isEditable = false }) {
  const [bio, setBio] = useState('');
  const [editing, setEditing] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const fetchAboutMe = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/aboutme/public');
      setBio(res.data.about || '');
    } catch (err) {
      console.error('Failed to fetch bio', err);
      setBio('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutMe();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Login required to update bio.');
      return;
    }

    try {
      await axios.put(
        'http://localhost:5000/api/aboutme',
        { about: newBio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBio(newBio);
      setEditing(false);
      setMessage('✅ Bio updated successfully!');
    } catch (err) {
      console.error('Failed to update bio', err);
      setMessage('❌ Failed to update bio.');
    } finally {
      setTimeout(() => setMessage(''), 2500);
    }
  };

  return (
    <div className="about-container">
      <h2>About Me</h2>

      {message && <div className="message">{message}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : editing ? (
        <>
          <textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            rows={6}
            placeholder="Write something about yourself..."
          />
          <div className="button-group" style={{ marginTop: 10 }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>{bio || 'No bio added yet.'}</p>
          {/* Show Edit button only if user is logged in and edit mode is allowed */}
          {isEditable && isLoggedIn && (
            <button
              onClick={() => {
                setNewBio(bio);
                setEditing(true);
              }}
            >
              Edit
            </button>
          )}
        </>
      )}
    </div>
  );
}
