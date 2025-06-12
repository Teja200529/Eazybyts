import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">🛠️ Admin Dashboard</h1>
        <button
          className="logout-button"
          onClick={handleLogout}
          aria-label="Logout"
        >
          🔒 Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <section className="dashboard-content">
          <p className="dashboard-welcome">
            Welcome to your dashboard. Use the tools below to manage your portfolio.
          </p>

          {/* Management Buttons */}
          <div className="dashboard-buttons">

            {/* View Projects */}
            <Link to="/projects">
              <button className="dashboard-btn" aria-label="View Projects">
                📂 View Projects
              </button>
            </Link>

            {/* Add New Project */}
            <Link to="/projects/new">
              <button className="dashboard-btn" aria-label="Add New Project">
                ➕ Add New Project
              </button>
            </Link>

            {/* Edit About Me */}
            <Link to="/admin/about">
              <button className="dashboard-btn" aria-label="Edit About Me">
                🧑 Edit About Me
              </button>
            </Link>

            {/* Edit Skills */}
            <Link to="/admin/skills">
              <button className="dashboard-btn" aria-label="Edit Skills">
                🛠️ Edit Skills
              </button>
            </Link>

          </div>
        </section>
      </main>
    </div>
  );
}
