import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Skills({ isEditable = false }) {
  const [skills, setSkills] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const [editLevel, setEditLevel] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    API.get('/profile/skills')
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err));

    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const saveSkills = async (updated) => {
    await API.post('/profile/skills', { skills: updated });
    setSkills(updated);
  };

  const handleAdd = async () => {
    if (!newSkillName || !newSkillLevel) return;
    const updated = [...skills, { name: newSkillName, level: newSkillLevel }];
    await saveSkills(updated);
    setNewSkillName('');
    setNewSkillLevel('');
    setShowAddForm(false);
  };

  const handleDelete = async (index) => {
    const updated = skills.filter((_, i) => i !== index);
    await saveSkills(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditName(skills[index].name);
    setEditLevel(skills[index].level);
  };

  const handleSaveEdit = async () => {
    const updated = [...skills];
    updated[editingIndex] = { name: editName, level: editLevel };
    await saveSkills(updated);
    setEditingIndex(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Skills</h2>

      <div style={styles.skillsWrap}>
        {skills.map((skill, i) => (
          <div
            key={i}
            style={styles.skillBadge}
            className="skill-badge"
            title={`${skill.name} (${skill.level})`}
          >
            {token && isEditable && editingIndex === i ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={styles.input}
                  placeholder="Skill"
                />
                <input
                  value={editLevel}
                  onChange={(e) => setEditLevel(e.target.value)}
                  style={styles.input}
                  placeholder="Level"
                />
                <button onClick={handleSaveEdit} style={styles.saveBtn}>
                  ✔
                </button>
              </>
            ) : (
              <>
                <span style={styles.skillText}>
                  {skill.name}{' '}
                  <span style={styles.levelText}>({skill.level})</span>
                </span>
                {token && isEditable && (
                  <>
                    <button
                      onClick={() => handleEdit(i)}
                      style={styles.editBtn}
                      aria-label={`Edit ${skill.name}`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      style={styles.delBtn}
                      aria-label={`Delete ${skill.name}`}
                    >
                      ❌
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {token && isEditable && (
        <>
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              style={styles.addMainBtn}
              aria-label="Add new skill"
            >
              ➕ Add Skill
            </button>
          ) : (
            <div style={styles.addForm}>
              <input
                placeholder="Skill name"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                style={styles.input}
              />
              <input
                placeholder="Skill level"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleAdd} style={styles.saveBtn}>
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                style={styles.delBtn}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '30px auto',
    padding: 20,
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f0f9ff',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0, 132, 255, 0.2)',
  },
  title: {
    color: '#0369a1',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '1.8rem',
  },
  skillsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  },
  skillBadge: {
    backgroundColor: '#e0f2fe',
    border: '1.5px solid #38bdf8',
    borderRadius: '24px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 600,
    color: '#0369a1',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
  },
  skillText: {
    color: '#0c4a6e',
    fontWeight: 600,
    fontSize: '1rem',
  },
  levelText: {
    fontWeight: 400,
    fontStyle: 'italic',
    color: '#2563eb',
    fontSize: '0.9rem',
  },
  editBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.0rem',
    color: '#0284c7',
    padding: '0 4px',
  },
  delBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.0rem',
    color: '#dc2626',
    padding: '0 4px',
  },
  saveBtn: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 14px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  addMainBtn: {
    marginTop: 24,
    padding: '10px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    transition: 'background-color 0.3s ease',
  },
  addForm: {
    marginTop: 20,
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: '8px 14px',
    borderRadius: '8px',
    border: '1.5px solid #38bdf8',
    fontSize: '1rem',
    outline: 'none',
    width: '150px',
  },
};
