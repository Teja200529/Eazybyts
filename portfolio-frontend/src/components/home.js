import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutMe from './aboutme';
import Skills from './skill';
import PublicProjectList from './projectlist';
import ContactForm from './contactform';
import '../styles/home.css';

export default function Home() {
  const [showContact, setShowContact] = useState(false);

  const toggleContact = () => {
    setShowContact(prev => !prev);
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">🚀 Welcome to My Portfolio CMS</h1>
        <p className="home-subtitle">Please register or login to continue</p>

        {/* Register and Login */}
        <div className="home-links">
          <Link to="/register" className="home-button">Register</Link>
          <Link to="/login" className="home-button secondary">Login</Link>
        </div>

        {/* About Me Section (Read-Only) */}
        <section className="about-section">
          <AboutMe isEditable={false} />
        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <Skills />
        </section>

        {/* Projects Section */}
        <section className="projects-section">
          {/* 👇 Edit disabled explicitly here */}
          <PublicProjectList isEditable={false} />
        </section>

        {/* Toggle Contact Button */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button 
            onClick={toggleContact} 
            className="home-button"
            style={{ cursor: 'pointer', minWidth: '150px' }}
            aria-expanded={showContact}
            aria-controls="contact-form-section"
          >
            {showContact ? 'Close Contact Form' : 'Contact Me'}
          </button>
        </div>

        {/* Contact Form (Visible only when toggled) */}
        {showContact && (
          <section 
            id="contact-form-section" 
            className="contact-section" 
            style={{ marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}
          >
            <ContactForm />
          </section>
        )}
      </div>
    </div>
  );
}
